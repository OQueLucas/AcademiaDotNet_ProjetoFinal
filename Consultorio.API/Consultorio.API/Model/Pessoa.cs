using System.ComponentModel.DataAnnotations.Schema;

namespace Consultorio.API.Model
{
    public class Pessoa
    {
        public int ID { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string Nome { get; set; }

        [Column(TypeName = "varchar(20)")]
        public string NomeSocial { get; set; }

        [Column(TypeName = "char(11)")]
        public string CPF { get; set; }

        public DateOnly DataNascimento { get; set; }

        [Column(TypeName = "varchar(60)")]
        public string Email { get; set; }

        [Column(TypeName = "varchar(20)")]
        public string TipoSanguineo { get; set; }

        [Column(TypeName = "varchar(20)")]
        public string Genero { get; set; }

        [Column(TypeName = "char(20)")]
        public string CEP { get; set; }

        [Column(TypeName = "varchar(20)")]
        public string Bairro { get; set; }

        [Column(TypeName = "varchar(20)")]
        public string Endereco { get; set; }

        [Column(TypeName = "varchar(11)")]
        public string Telefone { get; set; }
    }
}
