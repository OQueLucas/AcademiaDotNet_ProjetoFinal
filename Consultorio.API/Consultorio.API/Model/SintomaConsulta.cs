namespace Consultorio.API.Model
{
    public class SintomaConsulta : Entity
    {
        public int ConsultaId { get; set; }
        public Consulta Consulta { get; set; }
        public int SintomaId { get; set; }
        public Sintoma Sintoma { get; set; }
    }
}
