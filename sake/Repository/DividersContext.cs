using Microsoft.EntityFrameworkCore;

namespace Divider.Models;

public class DividersContext : DbContext
{
    protected readonly IConfiguration Configuration;

    public DividersContext(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        // connect to postgres with connection string from app settings
        options.UseNpgsql(Configuration.GetConnectionString("WebApiDatabase"));
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.UseIdentityColumns();
    }
    public DbSet<Contact> Contacts { get; set; }
    public DbSet<Night> Nights { get; set; }
    public DbSet<Place> Places { get; set; }
    public DbSet<Item> Items { get; set; }
}