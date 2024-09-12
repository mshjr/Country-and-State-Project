using Microsoft.EntityFrameworkCore;

namespace XC.Models;

public class Context : DbContext
{
    public Context() {}
    public Context(DbContextOptions<Context> options)
        : base(options)
    {
        Database.EnsureCreated();
    }

    public virtual DbSet<Country> Countries { get; set; } = null!;
    public virtual DbSet<State> States { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Country>().HasData(
            new Country { Id = 1, Name = "United States", Code = "US" },
            new Country { Id = 2, Name = "Canada", Code = "CA" },
            new Country { Id = 3, Name = "Mexico", Code = "MX" }
        );

        modelBuilder.Entity<State>().HasData(
            new State { Id = 1, Name = "Virginia", Code = "VA", CountryId = 1},
            new State { Id = 2, Name = "Iowa", Code = "IA", CountryId = 1},
            new State { Id = 3, Name = "Washington D.C.", Code = "DC", CountryId = 1},
            new State { Id = 4, Name = "California", Code = "CA", CountryId = 1},

            new State { Id = 5, Name = "Toronto", Code = "TO", CountryId = 2},
            new State { Id = 6, Name = "Quebec", Code = "QC", CountryId = 2},

            new State { Id = 7, Name = "Mexico City", Code = "MC", CountryId = 3}
        );
    }
}