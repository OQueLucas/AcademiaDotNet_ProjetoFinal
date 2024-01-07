using Consultorio.API.Model.Enum;
using Consultorio.API.ViewModel.Consulta;

namespace Consultorio.API.ViewModel.Paciente
{
    public class PacienteConsultaViewModel
    {
        public int? Id { get; set; }
        public TipoConsulta TipoConsulta { get; set; }
        public string? Descricao { get; set; }
        public DateTime Data { get; set; }
        public int MedicoId { get; set; }
        public string MedicoCRM { get; set; }
        public string? Especializacao { get; set; }
        public string? MedicoNome { get; set; }
        public string? MedicoNomeSocial { get; set; }
        public ICollection<SintomaConsultaViewModel>? Sintomas { get; set; }
    }
}
