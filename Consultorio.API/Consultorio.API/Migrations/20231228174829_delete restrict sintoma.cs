using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Consultorio.API.Migrations
{
    public partial class deleterestrictsintoma : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SintomaConsulta_Consulta_ConsultaId",
                table: "SintomaConsulta");

            migrationBuilder.AddForeignKey(
                name: "FK_SintomaConsulta_Consulta_ConsultaId",
                table: "SintomaConsulta",
                column: "ConsultaId",
                principalTable: "Consulta",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SintomaConsulta_Consulta_ConsultaId",
                table: "SintomaConsulta");

            migrationBuilder.AddForeignKey(
                name: "FK_SintomaConsulta_Consulta_ConsultaId",
                table: "SintomaConsulta",
                column: "ConsultaId",
                principalTable: "Consulta",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
