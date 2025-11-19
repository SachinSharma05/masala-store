using MasalaStore.Api.DTOs;
using MasalaStore.Api.Models;
using MasalaStore.Api.Services;
using MasalaStore.Api.Settings;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Security.Claims;

namespace MasalaStore.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly JwtService _jwtService;
        private readonly JwtSettings _jwtSettings;

        public AuthController(UserService userService, JwtService jwtService, IOptions<JwtSettings> jwtOptions)
        {
            _userService = userService;
            _jwtService = jwtService;
            _jwtSettings = jwtOptions.Value;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var exists = await _userService.GetByEmailAsync(dto.Email);
            if (exists != null) return BadRequest("Email already exists");

            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = dto.Role ?? "Admin", // adjust: first user can be Admin
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            await _userService.CreateAsync(user);
            return Ok(new { message = "Registered" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _userService.GetByEmailAsync(dto.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return Unauthorized("Invalid credentials");

            var token = _jwtService.GenerateToken(user);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true, // set to true in production
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddMinutes(_jwtSettings.ExpiresMinutes)
            };

            Response.Cookies.Append("MasalaStoreToken", token, cookieOptions);

            return Ok(new { message = "Logged in", role = user.Role });
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("MasalaStoreToken");
            return Ok(new { message = "Logged out" });
        }

        [HttpGet("me")]
        public async Task<IActionResult> Me()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var user = await _userService.GetByIdAsync(userId);
            if (user == null) return Unauthorized();

            return Ok(new { user.Id, user.Email, user.Role });
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateProfile(UserUpdateProfileDto dto)
        {
            var userId = User.FindFirst("id")?.Value; // JWT/Cookie

            if (userId == null)
                return Unauthorized();

            await _userService.UpdateProfileAsync(userId, dto);

            return Ok(new { message = "Profile updated successfully" });
        }
    }
}
