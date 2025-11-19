using MasalaStore.Api.Models;
using MasalaStore.Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MasalaStore.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userService;

        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<List<User>>> GetAll()
        {
            return await _userService.GetAllAsync();
        }

        // GET: api/users/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Get(string id)
        {
            var user = await _userService.GetByIdAsync(id);

            if (user == null)
                return NotFound();

            return user;
        }

        // POST: api/users
        [HttpPost]
        public async Task<ActionResult> Create(User user)
        {
            await _userService.CreateAsync(user);
            return Ok(user);
        }

        // PUT: api/users/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(string id, User updated)
        {
            var user = await _userService.GetByIdAsync(id);

            if (user == null)
                return NotFound();

            updated.Id = id; // Preserve ID
            await _userService.UpdateAsync(id, updated);

            return NoContent();
        }

        // DELETE: api/users/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var user = await _userService.GetByIdAsync(id);

            if (user == null)
                return NotFound();

            await _userService.DeleteAsync(id);

            return NoContent();
        }
    }
}
