namespace MasalaStore.Api.DTOs
{
    public class ProductCreateDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public int Weight { get; set; }
        public string Category { get; set; }

        public IFormFile Image { get; set; }
    }
}
