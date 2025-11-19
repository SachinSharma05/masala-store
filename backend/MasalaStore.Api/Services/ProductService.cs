using MasalaStore.Api.Models;
using MasalaStore.Api.Settings;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace MasalaStore.Api.Services
{
    public class ProductService
    {
        private readonly IMongoCollection<Product> _products;

        public ProductService(IMongoClient client, IOptions<MongoDbSettings> settings)
        {
            var database = client.GetDatabase(settings.Value.Database);
            _products = database.GetCollection<Product>(settings.Value.ProductsCollection);
        }

        public async Task<List<Product>> GetAsync() =>
            await _products.Find(_ => true).ToListAsync();

        public async Task<Product> GetAsync(string id) =>
            await _products.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Product product)
        {
            product.CreatedAt = DateTime.UtcNow;
            product.UpdatedAt = DateTime.UtcNow;
            await _products.InsertOneAsync(product);
        }

        public async Task UpdateAsync(string id, Product updated)
        {
            updated.Id = id;
            updated.UpdatedAt = DateTime.UtcNow;

            await _products.ReplaceOneAsync(x => x.Id == id, updated);
        }

        public async Task DeleteAsync(string id) =>
            await _products.DeleteOneAsync(x => x.Id == id);
    }
}
