using MasalaStore.Api.Models;
using MasalaStore.Api.Settings;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace MasalaStore.Api.Services
{
    public class OrderService
    {
        private readonly IMongoCollection<Order> _orders;
        private readonly ProductService _productService;

        public OrderService(IOptions<MongoDbSettings> settings, ProductService productService)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var db = client.GetDatabase(settings.Value.Database);

            _orders = db.GetCollection<Order>("Orders");
            _productService = productService;
        }

        public async Task<List<Order>> GetAllAsync() =>
            await _orders.Find(_ => true).SortByDescending(o => o.CreatedAt).ToListAsync();

        public async Task<Order?> GetAsync(string id) =>
            await _orders.Find(o => o.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Order order) =>
            await _orders.InsertOneAsync(order);

        public async Task UpdateStatusAsync(string id, string newStatus)
        {
            var update = Builders<Order>.Update.Set(o => o.Status, newStatus);
            await _orders.UpdateOneAsync(o => o.Id == id, update);
        }

        public async Task<long> CountAsync() =>
            await _orders.CountDocumentsAsync(_ => true);

        public async Task<int> GetTotalSalesAsync()
        {
            var orders = await _orders.Find(_ => true).ToListAsync();
            return orders.Sum(o => o.TotalAmount);
        }
    }
}
