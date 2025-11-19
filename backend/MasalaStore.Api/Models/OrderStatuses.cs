namespace MasalaStore.Api.Models
{
    public static class OrderStatuses
    {
        public const string Pending = "Pending";
        public const string Confirmed = "Confirmed";
        public const string Packed = "Packed";
        public const string Shipped = "Shipped";
        public const string Delivered = "Delivered";
        public const string Cancelled = "Cancelled";

        public static readonly List<string> All = new()
    {
        Pending, Confirmed, Packed, Shipped, Delivered, Cancelled
    };
    }
}
