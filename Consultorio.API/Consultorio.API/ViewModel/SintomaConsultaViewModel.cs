using Consultorio.API.Model;

namespace Consultorio.API.ViewModel
{
    public class SintomaConsultaViewModel
    {
        public int? Id { get; set; }
        public int ConsultaId { get; set; }
        public int SintomaId { get; set; }
        public Sintoma Sintoma { get; set; }
    }
}
