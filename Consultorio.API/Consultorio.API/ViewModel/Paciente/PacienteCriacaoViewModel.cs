using Consultorio.API.Model.Enum;
using System.ComponentModel.DataAnnotations;

namespace Consultorio.API.ViewModel.Paciente
{
    public class PacienteCriacaoViewModel
    {
        public string? Observacao { get; set; }
        public string Nome { get; set; }
        public string? NomeSocial { get; set; }
        [StringLength(11, ErrorMessage = "O campo {0} precisa ter {1} caracteres")]
        public string CPF { get; set; }
        public DateTime DataNascimento { get; set; }
        public string? Email { get; set; }
        public TipoSanguineo TipoSanguineo { get; set; }
        public Genero Genero { get; set; }
        public string? CEP { get; set; }
        public string? Bairro { get; set; }
        public string? Endereco { get; set; }
        public string? Telefone { get; set; }
    }
}
