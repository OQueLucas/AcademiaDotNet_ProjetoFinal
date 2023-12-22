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
        public MedicoViewModel Medico { get; set; }
        public int PacienteId { get; set; }
        public PacienteViewModel Paciente { get; set; }
        public ICollection<SintomaConsultaViewModel>? Sintomas { get; set; }
    }
}
