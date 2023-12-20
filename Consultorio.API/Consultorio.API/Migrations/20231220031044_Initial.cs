using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Consultorio.API.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Pessoa",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "varchar(100)", nullable: false),
                    NomeSocial = table.Column<string>(type: "varchar(30)", nullable: true),
                    CPF = table.Column<string>(type: "char(11)", nullable: false),
                    DataNascimento = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Email = table.Column<string>(type: "varchar(60)", nullable: true),
                    TipoSanguineo = table.Column<string>(type: "varchar(11)", nullable: true),
                    Genero = table.Column<string>(type: "varchar(20)", nullable: false),
                    CEP = table.Column<string>(type: "char(8)", nullable: true),
                    Bairro = table.Column<string>(type: "varchar(30)", nullable: true),
                    Endereco = table.Column<string>(type: "varchar(60)", nullable: true),
                    Telefone = table.Column<string>(type: "varchar(11)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pessoa", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Medico",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Especializacao = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CRM = table.Column<string>(type: "varchar(7)", nullable: false),
                    PessoaID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Medico", x => x.Id);
                    table.UniqueConstraint("AK_Medico_CRM", x => x.CRM);
                    table.ForeignKey(
                        name: "FK_Medico_Pessoa_PessoaID",
                        column: x => x.PessoaID,
                        principalTable: "Pessoa",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Paciente",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Observacao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PessoaID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Paciente", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Paciente_Pessoa_PessoaID",
                        column: x => x.PessoaID,
                        principalTable: "Pessoa",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Consulta",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TipoConsulta = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Descricao = table.Column<string>(type: "text", nullable: true),
                    Data = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MedicoCRM = table.Column<string>(type: "varchar(7)", nullable: false),
                    PacienteId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Consulta", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Consulta_Medico_MedicoCRM",
                        column: x => x.MedicoCRM,
                        principalTable: "Medico",
                        principalColumn: "CRM",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Consulta_Paciente_PacienteId",
                        column: x => x.PacienteId,
                        principalTable: "Paciente",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Sintoma",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ConsultaId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sintoma", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sintoma_Consulta_ConsultaId",
                        column: x => x.ConsultaId,
                        principalTable: "Consulta",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Consulta_MedicoCRM",
                table: "Consulta",
                column: "MedicoCRM");

            migrationBuilder.CreateIndex(
                name: "IX_Consulta_PacienteId",
                table: "Consulta",
                column: "PacienteId");

            migrationBuilder.CreateIndex(
                name: "IX_Medico_CRM",
                table: "Medico",
                column: "CRM",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Medico_PessoaID",
                table: "Medico",
                column: "PessoaID");

            migrationBuilder.CreateIndex(
                name: "IX_Paciente_PessoaID",
                table: "Paciente",
                column: "PessoaID");

            migrationBuilder.CreateIndex(
                name: "IX_Pessoa_CPF",
                table: "Pessoa",
                column: "CPF",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Sintoma_ConsultaId",
                table: "Sintoma",
                column: "ConsultaId");

            migrationBuilder.CreateIndex(
                name: "IX_Sintoma_Nome",
                table: "Sintoma",
                column: "Nome",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Sintoma");

            migrationBuilder.DropTable(
                name: "Consulta");

            migrationBuilder.DropTable(
                name: "Medico");

            migrationBuilder.DropTable(
                name: "Paciente");

            migrationBuilder.DropTable(
                name: "Pessoa");
        }
    }
}
