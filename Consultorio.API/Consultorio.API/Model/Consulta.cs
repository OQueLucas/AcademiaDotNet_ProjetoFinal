using Consultorio.API.Model.Enum;
using System.ComponentModel.DataAnnotations.Schema;

namespace Consultorio.API.Model
{
    public class Consulta : Entity
    {
        public TipoConsulta TipoConsulta { get; set; }
        [Column(TypeName = "text")]
        public string? Descricao { get; set; }
        public DateTime Data { get; set; }
        public string MedicoCRM { get; set; }
        public Medico Medico { get; set; }
        public int PacienteId { get; set; }
        public Paciente Paciente { get; set; }
        public ICollection<SintomaConsulta>? Sintomas { get; set; }
    }
}
