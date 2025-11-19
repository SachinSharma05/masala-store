using MasalaStore.Api.DTOs;
using MasalaStore.Api.Models;
using MasalaStore.Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MasalaStore.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly OrderService _orderService;
        private readonly ProductService _productService;

        public OrdersController(OrderService orderService, ProductService productService)
        {
            _orderService = orderService;
            _productService = productService;
        }

        // GET: api/orders
        [HttpGet]
        public async Task<ActionResult<List<Order>>> GetAll()
        {
            return await _orderService.GetAllAsync();
        }

        // GET: api/orders/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> Get(string id)
        {
            var order = await _orderService.GetAsync(id);
            if (order == null) return NotFound();
            return order;
        }

        // POST: api/orders
        [HttpPost]
        public async Task<IActionResult> Create(OrderCreateDto dto)
        {
            var order = new Order
            {
                CustomerName = dto.CustomerName,
                CustomerEmail = dto.CustomerEmail,
                CustomerPhone = dto.CustomerPhone,

                AddressLine1 = dto.AddressLine1,
                AddressLine2 = dto.AddressLine2,
                City = dto.City,
                State = dto.State,
                Pincode = dto.Pincode,

                Items = new List<OrderItem>()
            };

            int total = 0;

            foreach (var item in dto.Items)
            {
                var p = await _productService.GetAsync(item.ProductId);
                if (p == null) continue;

                order.Items.Add(new OrderItem
                {
                    ProductId = p.Id!,
                    Title = p.Title,
                    Price = p.Price,
                    Weight = p.Weight,
                    Quantity = item.Quantity
                });

                total += p.Price * item.Quantity;
            }

            order.TotalAmount = total;

            await _orderService.CreateAsync(order);

            return Ok(order);
        }

        // PUT: api/orders/{id}/status
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(string id, [FromBody] string newStatus)
        {
            await _orderService.UpdateStatusAsync(id, newStatus);
            return Ok(new { message = "Status updated" });
        }

        // GET: api/orders/sales-summary
        [HttpGet("sales-summary")]
        public async Task<IActionResult> SalesSummary()
        {
            var orders = await _orderService.GetAllAsync();

            var today = DateTime.UtcNow.Date;

            var summary = new
            {
                TotalOrders = orders.Count,
                TotalSales = orders.Sum(o => o.TotalAmount),
                TodaySales = orders.Where(o => o.CreatedAt.Date == today).Sum(o => o.TotalAmount),
                TodayOrders = orders.Count(o => o.CreatedAt.Date == today),

                MonthlySales = orders
                    .GroupBy(o => new { o.CreatedAt.Year, o.CreatedAt.Month })
                    .Select(g => new {
                        Month = new DateTime(g.Key.Year, g.Key.Month, 1),
                        Sales = g.Sum(o => o.TotalAmount)
                    })
                    .OrderBy(x => x.Month)
            };

            return Ok(summary);
        }
    }
}
