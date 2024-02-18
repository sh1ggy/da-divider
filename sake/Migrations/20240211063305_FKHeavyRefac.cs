using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TodoApi.Migrations
{
    /// <inheritdoc />
    public partial class FKHeavyRefac : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContactIds",
                table: "Places");

            migrationBuilder.DropColumn(
                name: "ContactIds",
                table: "Nights");

            migrationBuilder.CreateTable(
                name: "ContactNight",
                columns: table => new
                {
                    ContactsId = table.Column<int>(type: "integer", nullable: false),
                    NightsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactNight", x => new { x.ContactsId, x.NightsId });
                    table.ForeignKey(
                        name: "FK_ContactNight_Contacts_ContactsId",
                        column: x => x.ContactsId,
                        principalTable: "Contacts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ContactNight_Nights_NightsId",
                        column: x => x.NightsId,
                        principalTable: "Nights",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ContactPlace",
                columns: table => new
                {
                    ContactsId = table.Column<int>(type: "integer", nullable: false),
                    PlacesId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactPlace", x => new { x.ContactsId, x.PlacesId });
                    table.ForeignKey(
                        name: "FK_ContactPlace_Contacts_ContactsId",
                        column: x => x.ContactsId,
                        principalTable: "Contacts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ContactPlace_Places_PlacesId",
                        column: x => x.PlacesId,
                        principalTable: "Places",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Places_NightId",
                table: "Places",
                column: "NightId");

            migrationBuilder.CreateIndex(
                name: "IX_ContactNight_NightsId",
                table: "ContactNight",
                column: "NightsId");

            migrationBuilder.CreateIndex(
                name: "IX_ContactPlace_PlacesId",
                table: "ContactPlace",
                column: "PlacesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Places_Nights_NightId",
                table: "Places",
                column: "NightId",
                principalTable: "Nights",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Places_Nights_NightId",
                table: "Places");

            migrationBuilder.DropTable(
                name: "ContactNight");

            migrationBuilder.DropTable(
                name: "ContactPlace");

            migrationBuilder.DropIndex(
                name: "IX_Places_NightId",
                table: "Places");

            migrationBuilder.AddColumn<List<int>>(
                name: "ContactIds",
                table: "Places",
                type: "integer[]",
                nullable: false);

            migrationBuilder.AddColumn<List<int>>(
                name: "ContactIds",
                table: "Nights",
                type: "integer[]",
                nullable: false);
        }
    }
}
