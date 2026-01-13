using Microsoft.EntityFrameworkCore;
using Data.Model;

namespace Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<TaskData> Tasks { get; set; } = null!;

        public AppDbContext(DbContextOptions<AppDbContext> options):base(options) {}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaskData>().HasKey(x => x.Id);
            modelBuilder.Entity<TaskData>().Property(t => t.Status).HasConversion<string>();
            base.OnModelCreating(modelBuilder);
        }
    }
}
