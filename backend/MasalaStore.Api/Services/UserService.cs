using MasalaStore.Api.DTOs;
using MasalaStore.Api.Helpers;
using MasalaStore.Api.Models;
using MasalaStore.Api.Settings;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace MasalaStore.Api.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;

        public UserService(IMongoClient client, IOptions<MongoDbSettings> settings)
        {
            var db = client.GetDatabase(settings.Value.Database);
            _users = db.GetCollection<User>(settings.Value.UsersCollection);
        }

        public async Task<User?> GetByEmailAsync(string email) =>
            await _users.Find(u => u.Email.ToLower() == email.ToLower()).FirstOrDefaultAsync();

        public async Task<User?> GetByIdAsync(string id) =>
            await _users.Find(u => u.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(User user) =>
            await _users.InsertOneAsync(user);

        public async Task<List<User>> GetAllAsync() =>
            await _users.Find(_ => true).ToListAsync();

        public async Task UpdateAsync(string id, User updatedUser) =>
            await _users.ReplaceOneAsync(u => u.Id == id, updatedUser);

        public async Task DeleteAsync(string id) =>
            await _users.DeleteOneAsync(u => u.Id == id);

        public async Task UpdateProfileAsync(string id, UserUpdateProfileDto dto)
        {
            var user = await GetByIdAsync(id);

            if (user == null)
                throw new Exception("User not found");

            user.Name = dto.Name;
            user.Email = dto.Email;

            if (!string.IsNullOrEmpty(dto.Password))
                user.PasswordHash = PasswordHelper.Hash(dto.Password);

            await _users.ReplaceOneAsync(u => u.Id == id, user);
        }
    }
}
