using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MasalaStore.Api.Models
{
    public class AppSettings
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string StoreName { get; set; } = "";
        public string StoreDescription { get; set; } = "";
        public string ContactEmail { get; set; } = "";
        public string Currency { get; set; } = "INR";

        public double GstPercentage { get; set; } = 5;
        public double DeliveryCharge { get; set; } = 0;

        public string? StoreLogoUrl { get; set; } // Image URL
    }
}
