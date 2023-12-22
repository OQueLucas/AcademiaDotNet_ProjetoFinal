using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Consultorio.API.Migrations
{
    public partial class addingtableSintomaConsulta : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sintoma_Consulta_ConsultaId",
                table: "Sintoma");

            migrationBuilder.DropIndex(
                name: "IX_Sintoma_ConsultaId",
                table: "Sintoma");

            migrationBuilder.DropColumn(
                name: "ConsultaId",
                table: "Sintoma");

            migrationBuilder.CreateTable(
                name: "SintomaConsulta",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ConsultaId = table.Column<int>(type: "int", nullable: false),
                    SintomaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SintomaConsulta", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SintomaConsulta_Consulta_ConsultaId",
                        column: x => x.ConsultaId,
                        principalTable: "Consulta",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SintomaConsulta_Sintoma_SintomaId",
                        column: x => x.SintomaId,
                        principalTable: "Sintoma",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SintomaConsulta_ConsultaId",
                table: "SintomaConsulta",
                column: "ConsultaId");

            migrationBuilder.CreateIndex(
                name: "IX_SintomaConsulta_SintomaId",
                table: "SintomaConsulta",
                column: "SintomaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SintomaConsulta");

            migrationBuilder.AddColumn<int>(
                name: "ConsultaId",
                table: "Sintoma",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Sintoma_ConsultaId",
                table: "Sintoma",
                column: "ConsultaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Sintoma_Consulta_ConsultaId",
                table: "Sintoma",
                column: "ConsultaId",
                principalTable: "Consulta",
                principalColumn: "Id");
        }
    }
}
