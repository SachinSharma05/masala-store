namespace MasalaStore.Api.Helpers
{
    public class ProductsHelper
    {
        public string? ExtractPublicId(string imageUrl)
        {
            try
            {
                // Example:
                // https://res.cloudinary.com/xxx/image/upload/v123456/masala-store/filename.jpg

                var uri = new Uri(imageUrl);
                var segments = uri.Segments;

                // segments example:
                // ["/", "image/", "upload/", "v123456/", "masala-store/", "filename.jpg"]

                var folder = segments[segments.Length - 2].TrimEnd('/');
                var fileName = segments.Last();

                // fileName => "filename.jpg" → "filename"
                var nameWithoutExtension = fileName.Split('.')[0];

                return $"{folder}/{nameWithoutExtension}";
            }
            catch
            {
                return null;
            }
        }

    }
}
