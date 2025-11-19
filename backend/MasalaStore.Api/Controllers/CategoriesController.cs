using MasalaStore.Api.DTOs;
using MasalaStore.Api.Models;
using MasalaStore.Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MasalaStore.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly CategoryService _service;

        public CategoriesController(CategoryService service)
        {
            _service = service;
        }

        // GET all
        [HttpGet]
        public async Task<IActionResult> Get() =>
            Ok(await _service.GetAsync());

        // GET by id
        [HttpGet("{id:length(24)}")]
        public async Task<IActionResult> Get(string id)
        {
            var category = await _service.GetAsync(id);
            if (category == null) return NotFound();

            return Ok(category);
        }

        // POST
        [HttpPost]
        public async Task<IActionResult> Post(CreateCategoryDto dto)
        {
            var category = new Category
            {
                Name = dto.Name,
                Slug = dto.Name.ToLower().Replace(" ", "-"),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            await _service.CreateAsync(category);

            return CreatedAtAction(nameof(Get), new { id = category.Id }, category);
        }

        // PUT
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Put(string id, UpdateCategoryDto dto)
        {
            var existing = await _service.GetAsync(id);
            if (existing == null) return NotFound();

            existing.Name = dto.Name;
            existing.Slug = dto.Name.ToLower().Replace(" ", "-");
            existing.UpdatedAt = DateTime.UtcNow;

            await _service.UpdateAsync(id, existing);

            return Ok(existing);
        }

        // DELETE
        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var existing = await _service.GetAsync(id);
            if (existing == null) return NotFound();

            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
