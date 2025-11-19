using MasalaStore.Api.DTOs;
using MasalaStore.Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MasalaStore.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppSettingsController : ControllerBase
    {
        private readonly AppSettingsService _service;

        public AppSettingsController(AppSettingsService service)
        {
            _service = service;
        }

        // GET: api/settings
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var settings = await _service.GetSettingsAsync();
            return Ok(settings);
        }

        // PUT: api/settings (multipart/form-data)
        [HttpPut]
        public async Task<IActionResult> Update([FromForm] AppSettingsUpdateDto dto)
        {
            var settings = await _service.GetSettingsAsync();

            settings.StoreName = dto.StoreName;
            settings.StoreDescription = dto.StoreDescription;
            settings.ContactEmail = dto.ContactEmail;
            settings.Currency = dto.Currency;
            settings.GstPercentage = dto.GstPercentage;
            settings.DeliveryCharge = dto.DeliveryCharge;

            // Handle logo upload
            if (dto.StoreLogo != null)
            {
                var fileName = $"{Guid.NewGuid()}_{dto.StoreLogo.FileName}";
                var filePath = Path.Combine("wwwroot/store-logo/", fileName);

                Directory.CreateDirectory("wwwroot/store-logo");

                using var stream = System.IO.File.Create(filePath);
                await dto.StoreLogo.CopyToAsync(stream);

                settings.StoreLogoUrl = "/store-logo/" + fileName;
            }

            await _service.UpdateSettingsAsync(settings);

            return Ok(settings);
        }
    }
}
