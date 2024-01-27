using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TodoApi.Migrations
{
    /// <inheritdoc />
    public partial class ClassesInitialRefactor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_Places_PlaceId",
                table: "Contacts");

            migrationBuilder.DropForeignKey(
                name: "FK_Items_Contacts_AssigneeId",
                table: "Items");

            migrationBuilder.DropForeignKey(
                name: "FK_Places_Nights_NightId",
                table: "Places");

            migrationBuilder.DropTable(
                name: "TestItems");

            migrationBuilder.DropIndex(
                name: "IX_Places_NightId",
                table: "Places");

            migrationBuilder.DropIndex(
                name: "IX_Items_AssigneeId",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Contacts_PlaceId",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "NightId",
                table: "Places");

            migrationBuilder.DropColumn(
                name: "PlaceId",
                table: "Contacts");

            migrationBuilder.RenameColumn(
                name: "AssigneeId",
                table: "Items",
                newName: "ContactId");

            migrationBuilder.AddColumn<List<int>>(
                name: "ContactIds",
                table: "Places",
                type: "integer[]",
                nullable: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContactIds",
                table: "Places");

            migrationBuilder.RenameColumn(
                name: "ContactId",
                table: "Items",
                newName: "AssigneeId");

            migrationBuilder.AddColumn<int>(
                name: "NightId",
                table: "Places",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PlaceId",
                table: "Contacts",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "TestItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestItems", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Places_NightId",
                table: "Places",
                column: "NightId");

            migrationBuilder.CreateIndex(
                name: "IX_Items_AssigneeId",
                table: "Items",
                column: "AssigneeId");

            migrationBuilder.CreateIndex(
                name: "IX_Contacts_PlaceId",
                table: "Contacts",
                column: "PlaceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_Places_PlaceId",
                table: "Contacts",
                column: "PlaceId",
                principalTable: "Places",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Contacts_AssigneeId",
                table: "Items",
                column: "AssigneeId",
                principalTable: "Contacts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Places_Nights_NightId",
                table: "Places",
                column: "NightId",
                principalTable: "Nights",
                principalColumn: "Id");
        }
    }
}
