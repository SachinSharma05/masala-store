using MasalaStore.Api.Models;
using MasalaStore.Api.Settings;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace MasalaStore.Api.Services
{
    public class AppSettingsService
    {
        private readonly IMongoCollection<AppSettings> _settings;

        public AppSettingsService(IOptions<MongoDbSettings> options)
        {
            var client = new MongoClient(options.Value.ConnectionString);
            var database = client.GetDatabase(options.Value.Database);
            _settings = database.GetCollection<AppSettings>("AppSettings");
        }

        // Always get the first and only settings record
        public async Task<AppSettings> GetSettingsAsync()
        {
            var settings = await _settings.Find(_ => true).FirstOrDefaultAsync();

            if (settings == null)
            {
                settings = new AppSettings();
                await _settings.InsertOneAsync(settings);
            }

            return settings;
        }

        public async Task UpdateSettingsAsync(AppSettings updated)
        {
            await _settings.ReplaceOneAsync(_ => true, updated);
        }
    }
}
