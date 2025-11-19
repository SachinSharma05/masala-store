namespace MasalaStore.Api.DTOs
{
    public class ProductUpdateDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public int Weight { get; set; }
        public string Category { get; set; }

        // optional new image upload
        public IFormFile? Image { get; set; }
    }
}
