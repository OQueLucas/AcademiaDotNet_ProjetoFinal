using Consultorio.API.Model.Enum;

namespace Consultorio.API.ViewModel.Consulta
{
    public class ConsultaCriacaoViewModel
    {
        public TipoConsulta TipoConsulta { get; set; }
        public string? Descricao { get; set; }
        public DateTime Data { get; set; }
        public int MedicoId { get; set; }
        public string MedicoCRM { get; set; }
        public int PacienteId { get; set; }
        public ICollection<SintomaConsultaCriacaoViewModel>? Sintomas { get; set; }
    }
}
