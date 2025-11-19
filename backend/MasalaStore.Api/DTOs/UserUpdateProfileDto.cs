namespace MasalaStore.Api.DTOs
{
    public class UserUpdateProfileDto
    {
        public string Name { get; set; } = "";
        public string Email { get; set; } = "";
        public string? Password { get; set; }  // optional
    }
}
