namespace Consultorio.API.Model
{
    public class Consulta
    {
        public int Id { get; set; }
        public string tipo_consulta { get; set; }
        public string Descricao { get; set; }
        public DateTime Data { get; set; }
        public int MedicoId { get; set; }
        public Medico Medico { get; set; }
        public int PacienteId { get; set; }
        public Paciente Paciente { get; set; }
        public ICollection<Sintoma>? Sintomas { get; set; }
    }
}
