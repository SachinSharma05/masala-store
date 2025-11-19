using MasalaStore.Api.Models;
using MasalaStore.Api.Settings;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace MasalaStore.Api.Services
{
    public class CategoryService
    {
        private readonly IMongoCollection<Category> _categories;

        public CategoryService(IMongoClient client, IOptions<MongoDbSettings> settings)
        {
            var db = client.GetDatabase(settings.Value.Database);
            _categories = db.GetCollection<Category>(settings.Value.CategoriesCollection);
        }

        public async Task<List<Category>> GetAsync() =>
            await _categories.Find(_ => true).ToListAsync();

        public async Task<Category?> GetAsync(string id) =>
            await _categories.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Category category) =>
            await _categories.InsertOneAsync(category);

        public async Task UpdateAsync(string id, Category category) =>
            await _categories.ReplaceOneAsync(x => x.Id == id, category);

        public async Task DeleteAsync(string id) =>
            await _categories.DeleteOneAsync(x => x.Id == id);
    }
}
