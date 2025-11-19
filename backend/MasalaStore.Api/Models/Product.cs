using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MasalaStore.Api.Models
{
    [BsonIgnoreExtraElements]
    public class Product
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("title")]
        public string Title { get; set; }

        [BsonElement("description")]
        public string Description { get; set; }

        [BsonElement("price")]
        public int Price { get; set; }

        [BsonElement("weight")]
        public int Weight { get; set; }

        [BsonElement("images")]
        public List<string> Images { get; set; } = new();

        [BsonElement("category")]
        public string Category { get; set; }

        [BsonElement("slug")]
        public string Slug { get; set; }

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; }

        [BsonElement("updatedAt")]
        public DateTime UpdatedAt { get; set; }
    }
}
