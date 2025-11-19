using MasalaStore.Api.Services;
using MasalaStore.Api.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Controllers & Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ---------------------------
// Load appsettings sections
// ---------------------------
builder.Services.Configure<MongoDbSettings>(
    builder.Configuration.GetSection("MongoDb"));

builder.Services.Configure<CloudinarySettings>(
    builder.Configuration.GetSection("Cloudinary"));

builder.Services.Configure<JwtSettings>(
    builder.Configuration.GetSection("Jwt"));

// Read JwtSettings for key
var jwtSettings = builder.Configuration.GetSection("Jwt").Get<JwtSettings>();
var key = Encoding.UTF8.GetBytes(jwtSettings.Key);

// ---------------------------
// MongoDB
// ---------------------------
builder.Services.AddSingleton<IMongoClient>(sp =>
{
    var s = sp.GetRequiredService<IOptions<MongoDbSettings>>().Value;

    if (string.IsNullOrEmpty(s.ConnectionString))
        throw new InvalidOperationException("MongoDb.ConnectionString is NOT set");

    return new MongoClient(s.ConnectionString);
});

// ---------------------------
// Services
// ---------------------------
builder.Services.AddSingleton<JwtService>();
builder.Services.AddSingleton<ProductService>();
builder.Services.AddSingleton<CategoryService>();
builder.Services.AddSingleton<UserService>();
builder.Services.AddSingleton<CloudinaryService>();
builder.Services.AddSingleton<OrderService>();

// ---------------------------
// Authentication (JWT in HttpOnly Cookie)
// ---------------------------
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = jwtSettings.Issuer,

        ValidateAudience = true,
        ValidAudience = jwtSettings.Audience,

        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),

        ValidateLifetime = true
    };

    // Read token from cookie if Authorization header is missing
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            if (string.IsNullOrEmpty(context.Request.Headers["Authorization"]))
            {
                if (context.Request.Cookies.TryGetValue("MasalaStoreToken", out var cookieToken))
                {
                    context.Token = cookieToken;
                }
            }
            return Task.CompletedTask;
        }
    };
});

// ---------------------------
// CORS: Allow Frontend
// ---------------------------
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
        .WithOrigins("http://localhost:5173")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});

builder.Services.AddAuthorization();

var app = builder.Build();

// ---------------------------
// Middlewares
// ---------------------------

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthentication();   // <-- REQUIRED BEFORE Authorization
app.UseAuthorization();

app.MapControllers();

app.Run();
