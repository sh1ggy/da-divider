using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TodoApi.Migrations
{
    /// <inheritdoc />
    public partial class FKPlaceSet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_Nights_NightId",
                table: "Contacts");

            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_Places_PlaceId",
                table: "Contacts");

            migrationBuilder.DropIndex(
                name: "IX_Contacts_NightId",
                table: "Contacts");

            migrationBuilder.DropIndex(
                name: "IX_Contacts_PlaceId",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "NightId",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "PlaceId",
                table: "Contacts");

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
                name: "IX_ContactNight_NightsId",
                table: "ContactNight",
                column: "NightsId");

            migrationBuilder.CreateIndex(
                name: "IX_ContactPlace_PlacesId",
                table: "ContactPlace",
                column: "PlacesId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContactNight");

            migrationBuilder.DropTable(
                name: "ContactPlace");

            migrationBuilder.AddColumn<int>(
                name: "NightId",
                table: "Contacts",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PlaceId",
                table: "Contacts",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Contacts_NightId",
                table: "Contacts",
                column: "NightId");

            migrationBuilder.CreateIndex(
                name: "IX_Contacts_PlaceId",
                table: "Contacts",
                column: "PlaceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_Nights_NightId",
                table: "Contacts",
                column: "NightId",
                principalTable: "Nights",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_Places_PlaceId",
                table: "Contacts",
                column: "PlaceId",
                principalTable: "Places",
                principalColumn: "Id");
        }
    }
}
