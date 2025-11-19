using MasalaStore.Api.DTOs;
using MasalaStore.Api.Helpers;
using MasalaStore.Api.Models;
using MasalaStore.Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MasalaStore.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductService _service;
        private readonly CloudinaryService _cloudinary;
        private readonly ProductsHelper productsHelper;

        public ProductsController(ProductService service, CloudinaryService cloudinary)
        {
            _service = service;
            _cloudinary = cloudinary;
        }

        // GET all
        [HttpGet]
        public async Task<IActionResult> Get() =>
            Ok(await _service.GetAsync());

        // GET by id
        [HttpGet("{id:length(24)}")]
        public async Task<IActionResult> Get(string id)
        {
            var product = await _service.GetAsync(id);
            if (product is null) return NotFound();

            return Ok(product);
        }

        // POST
        [HttpPost]
        [Consumes("multipart/form-data")]   // important
        public async Task<IActionResult> Post([FromForm] ProductCreateDto dto)
        {
            // 1. Upload Image to Cloudinary
            var uploadResult = await _cloudinary.UploadAsync(dto.Image);

            // 2. Create product object
            var product = new Product
            {
                Title = dto.Title,
                Description = dto.Description,
                Price = dto.Price,
                Weight = dto.Weight,
                Category = dto.Category,
                Images = new List<string> { uploadResult.SecureUrl.ToString() },
                Slug = dto.Title.ToLower().Replace(" ", "-"),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            // 3. Save in Mongo
            await _service.CreateAsync(product);

            return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
        }

        // PUT
        [HttpPut("{id:length(24)}")]
        [Consumes("multipart/form-data")] // needed for Swagger + file upload
        public async Task<IActionResult> Put(string id, [FromForm] ProductUpdateDto dto)
        {
            // 1. Get existing product
            var existing = await _service.GetAsync(id);
            if (existing is null)
                return NotFound();

            // 2. If a new image is uploaded → delete old one + upload new one
            if (dto.Image != null)
            {
                // extract publicId from Cloudinary url
                var oldImageUrl = existing.Images?.FirstOrDefault();

                if (!string.IsNullOrEmpty(oldImageUrl))
                {
                    var publicId = productsHelper.ExtractPublicId(oldImageUrl);
                    if (!string.IsNullOrEmpty(publicId))
                    {
                        await _cloudinary.DeleteAsync(publicId);
                    }
                }

                // Upload new image
                var uploadResult = await _cloudinary.UploadAsync(dto.Image);

                // Replace the Images array with the new image URL
                existing.Images = new List<string> { uploadResult.SecureUrl.ToString() };
            }

            // 3. Update fields
            existing.Title = dto.Title;
            existing.Description = dto.Description;
            existing.Price = dto.Price;
            existing.Weight = dto.Weight;
            existing.Category = dto.Category;
            existing.Slug = dto.Title.ToLower().Replace("/", "-");
            existing.UpdatedAt = DateTime.UtcNow;

            // 4. Save to MongoDB
            await _service.UpdateAsync(id, existing);

            return Ok(existing);
        }


        // DELETE
        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            // 1. Get existing product
            var existing = await _service.GetAsync(id);
            if (existing is null)
                return NotFound("Product not found");

            // 2. Delete Cloudinary Image (if exists)
            var oldImageUrl = existing.Images?.FirstOrDefault();

            if (!string.IsNullOrWhiteSpace(oldImageUrl))
            {
                var publicId = productsHelper.ExtractPublicId(oldImageUrl);

                if (!string.IsNullOrWhiteSpace(publicId))
                {
                    await _cloudinary.DeleteAsync(publicId);
                }
            }

            // 3. Delete product from database
            await _service.DeleteAsync(id);

            return NoContent();
        }

    }
}
