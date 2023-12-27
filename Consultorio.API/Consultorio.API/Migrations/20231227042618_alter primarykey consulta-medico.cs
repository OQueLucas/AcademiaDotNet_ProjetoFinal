using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Consultorio.API.Migrations
{
    public partial class alterprimarykeyconsultamedico : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Consulta_Medico_MedicoCRM",
                table: "Consulta");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Medico_CRM",
                table: "Medico");

            migrationBuilder.DropIndex(
                name: "IX_Consulta_MedicoCRM",
                table: "Consulta");

            migrationBuilder.AddColumn<int>(
                name: "MedicoId",
                table: "Consulta",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Consulta_MedicoId",
                table: "Consulta",
                column: "MedicoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Consulta_Medico_MedicoId",
                table: "Consulta",
                column: "MedicoId",
                principalTable: "Medico",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Consulta_Medico_MedicoId",
                table: "Consulta");

            migrationBuilder.DropIndex(
                name: "IX_Consulta_MedicoId",
                table: "Consulta");

            migrationBuilder.DropColumn(
                name: "MedicoId",
                table: "Consulta");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Medico_CRM",
                table: "Medico",
                column: "CRM");

            migrationBuilder.CreateIndex(
                name: "IX_Consulta_MedicoCRM",
                table: "Consulta",
                column: "MedicoCRM");

            migrationBuilder.AddForeignKey(
                name: "FK_Consulta_Medico_MedicoCRM",
                table: "Consulta",
                column: "MedicoCRM",
                principalTable: "Medico",
                principalColumn: "CRM",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
