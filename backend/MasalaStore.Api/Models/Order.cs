using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MasalaStore.Api.Models
{
    public class Order
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string CustomerName { get; set; }
        public string CustomerEmail { get; set; }
        public string CustomerPhone { get; set; }

        public string AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Pincode { get; set; }

        public List<OrderItem> Items { get; set; } = new();

        public int TotalAmount { get; set; }

        public string Status { get; set; } = "Pending";
        // Pending, Confirmed, Packed, Shipped, Delivered, Cancelled

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
