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
                optionsBuilder.UseSqlServer("Server=.\\SQLExpress;Database=HikingBag;Trusted_Connection=True;");
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
            });

            modelBuilder.Entity<BagSave>(entity =>
            {
                entity.HasKey(e => e.BagId)
                    .HasName("PK__BagSave__9A4110885A9A967F");

                entity.ToTable("BagSave");

                entity.Property(e => e.BagId).HasColumnName("BagID");

                entity.Property(e => e.ItemId).HasColumnName("ItemID");

                entity.HasOne(d => d.Item)
                    .WithMany(p => p.BagSaves)
                    .HasForeignKey(d => d.ItemId)
                    .HasConstraintName("FK__BagSave__ItemID__2A4B4B5E");
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
