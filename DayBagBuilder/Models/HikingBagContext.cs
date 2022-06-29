using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DayBagBuilder.Models
{
    public partial class HikingBagContext : DbContext
    {
        public HikingBagContext()
        {
        }

        public HikingBagContext(DbContextOptions<HikingBagContext> options)
            : base(options)
        {
        }

        public virtual DbSet<BagItem> BagItems { get; set; } = null!;
        public virtual DbSet<BagSave> BagSaves { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.

                optionsBuilder.UseSqlServer("Server=tcp:bagbuilder.database.windows.net,1433;Initial Catalog=HikingBag;Persist Security Info=False;User ID=GCfinal;Password=awa@GC12345;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");

            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BagItem>(entity =>
            {
                entity.Property(e => e.ForCold).HasColumnName("forCold");

                entity.Property(e => e.ForHot).HasColumnName("forHot");

                entity.Property(e => e.ForRain).HasColumnName("forRain");

                entity.Property(e => e.ForSnow).HasColumnName("forSnow");

                entity.Property(e => e.ForSunny).HasColumnName("forSunny");

                entity.Property(e => e.ItemName).HasMaxLength(50);

                entity.Property(e => e.Itemweight).HasColumnName("itemweight");
            });

            modelBuilder.Entity<BagSave>(entity =>
            {
                entity.ToTable("BagSave");

                entity.Property(e => e.ItemName).HasMaxLength(30);

                entity.Property(e => e.Itemweight).HasColumnName("itemweight");

                entity.Property(e => e.UserName).HasMaxLength(30);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.TripLocation).HasMaxLength(30);

                entity.Property(e => e.UserId)
                    .HasMaxLength(20)
                    .HasColumnName("UserID");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
