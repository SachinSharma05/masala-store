namespace MasalaStore.Api.Settings
{
    public class MongoDbSettings
    {
        public string ConnectionString { get; set; }
        public string Database { get; set; }
        public string ProductsCollection { get; set; }
        public string CategoriesCollection { get; set; }
        public string UsersCollection { get; set; }
    }
}
