namespace Consultorio.API.Model
{
    public class Paciente : Entity
    {
        public string? Observacao { get; set; }
        public int PessoaID { get; set; }
        public virtual Pessoa Pessoa { get; set; }
        public virtual ICollection<Consulta>? Consultas { get; set; }
    }
}
