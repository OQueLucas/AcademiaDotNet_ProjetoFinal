namespace Consultorio.API.Model
{
    public class Medico
    {
        public int Id { get; set; }
        public string Especializacao { get; set; }
        public int PessoaID { get; set; }
        public virtual Pessoa Pessoa { get; set; }
    }
}
