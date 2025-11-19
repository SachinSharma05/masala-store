using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MasalaStore.Api.Models
{
    public class OrderItem
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string ProductId { get; set; }

        public string Title { get; set; }
        public int Price { get; set; }
        public int Weight { get; set; }
        public int Quantity { get; set; }
    }
}
