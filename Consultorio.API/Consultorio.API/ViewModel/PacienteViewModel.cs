namespace Consultorio.API.ViewModel
{
    public class PacienteViewModel
    {
        public PacienteViewModel()
        {
        }
        public PacienteViewModel(string? observacao) : base()
        {
            Observacao = observacao;
        }

        public int? Id { get; set; }
        public string? Observacao { get; set; }
        public int PessoaID { get; set; }
        public virtual PessoaViewModel Pessoa { get; set; }
    }
}
