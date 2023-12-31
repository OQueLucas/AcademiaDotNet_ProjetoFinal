using Consultorio.API.Model.Enum;

namespace Consultorio.API.ViewModel.Consulta
{
    public class ConsultaEdicaoViewModel
    {
        public int Id { get; set; }
        public TipoConsulta TipoConsulta { get; set; }
        public string? Descricao { get; set; }
        public DateTime Data { get; set; }
        public int MedicoId { get; set; }
        public string MedicoCRM { get; set; }
        public int PacienteId { get; set; }
        public ICollection<SintomaConsultaEdicaoViewModel>? Sintomas { get; set; }
    }
}
