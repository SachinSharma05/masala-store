using MasalaStore.Api.DTOs;
using MasalaStore.Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MasalaStore.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MediaController : ControllerBase
    {
        private readonly CloudinaryService _cloudinary;

        public MediaController(CloudinaryService cloudinary)
        {
            _cloudinary = cloudinary;
        }

        [HttpPost("upload")]
        [Consumes("multipart/form-data")]  // required for Swagger
        public async Task<IActionResult> Upload([FromForm] FileUploadDto dto)
        {
            if (dto.File == null || dto.File.Length == 0)
                return BadRequest("No file provided");

            var result = await _cloudinary.UploadAsync(dto.File);

            return Ok(new
            {
                url = result.SecureUrl.ToString(),
                publicId = result.PublicId
            });
        }

        [HttpDelete("delete/{publicId}")]
        public async Task<IActionResult> Delete(string publicId)
        {
            var result = await _cloudinary.DeleteAsync(publicId);
            return Ok(result);
        }
    }
}
