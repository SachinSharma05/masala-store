namespace MasalaStore.Api.DTOs
{
    public class AppSettingsUpdateDto
    {
        public string StoreName { get; set; } = "";
        public string StoreDescription { get; set; } = "";
        public string ContactEmail { get; set; } = "";
        public string Currency { get; set; } = "INR";
        public double GstPercentage { get; set; }
        public double DeliveryCharge { get; set; }

        // optional logo upload
        public IFormFile? StoreLogo { get; set; }
    }
}
