using Consultorio.API.Model.Enum;

namespace Consultorio.API.ViewModel
{
    public class ConsultaViewModel
    {
        public int? Id { get; set; }
        public TipoConsulta TipoConsulta { get; set; }
        public string? Descricao { get; set; }
        public DateTime Data { get; set; }
        public string MedicoCRM { get; set; }
        public string Especializacao { get; set; }
        public string MedicoNome { get; set; }
        public string? MedicoNomeSocial { get; set; }
        public int PacienteId { get; set; }
        public string Nome { get; set; }
        public string? NomeSocial { get; set; }
        public string CPF { get; set; }
        public DateTime DataNascimento { get; set; }
        public string? Email { get; set; }
        public TipoSanguineo? TipoSanguineo { get; set; }
        public Genero Genero { get; set; }
        public ICollection<SintomaConsultaViewModel>? Sintomas { get; set; }
    }
}
