﻿// <auto-generated />
using System;
using Divider.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TodoApi.Migrations
{
    [DbContext(typeof(DividersContext))]
    [Migration("20240216064615_ICollectionFK")]
    partial class ICollectionFK
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("ContactNight", b =>
                {
                    b.Property<int>("ContactsId")
                        .HasColumnType("integer");

                    b.Property<int>("NightsId")
                        .HasColumnType("integer");

                    b.HasKey("ContactsId", "NightsId");

                    b.HasIndex("NightsId");

                    b.ToTable("ContactNight");
                });

            modelBuilder.Entity("ContactPlace", b =>
                {
                    b.Property<int>("ContactsId")
                        .HasColumnType("integer");

                    b.Property<int>("PlacesId")
                        .HasColumnType("integer");

                    b.HasKey("ContactsId", "PlacesId");

                    b.HasIndex("PlacesId");

                    b.ToTable("ContactPlace");
                });

            modelBuilder.Entity("Divider.Models.Contact", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("Mobile")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Contacts");
                });

            modelBuilder.Entity("Divider.Models.Item", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("ContactId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("PlaceId")
                        .HasColumnType("integer");

                    b.Property<float>("Price")
                        .HasColumnType("real");

                    b.Property<int?>("Quantity")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Items");
                });

            modelBuilder.Entity("Divider.Models.Night", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.ToTable("Nights");
                });

            modelBuilder.Entity("Divider.Models.Place", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("NightId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("NightId");

                    b.ToTable("Places");
                });

            modelBuilder.Entity("ContactNight", b =>
                {
                    b.HasOne("Divider.Models.Contact", null)
                        .WithMany()
                        .HasForeignKey("ContactsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Divider.Models.Night", null)
                        .WithMany()
                        .HasForeignKey("NightsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ContactPlace", b =>
                {
                    b.HasOne("Divider.Models.Contact", null)
                        .WithMany()
                        .HasForeignKey("ContactsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Divider.Models.Place", null)
                        .WithMany()
                        .HasForeignKey("PlacesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Divider.Models.Place", b =>
                {
                    b.HasOne("Divider.Models.Night", "Night")
                        .WithMany("Places")
                        .HasForeignKey("NightId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Night");
                });

            modelBuilder.Entity("Divider.Models.Night", b =>
                {
                    b.Navigation("Places");
                });
#pragma warning restore 612, 618
        }
    }
}
