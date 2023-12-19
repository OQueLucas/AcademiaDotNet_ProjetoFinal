namespace Consultorio.API.ViewModel
{
    public class MedicoViewModel
    {
        public MedicoViewModel()
        {
        }
        public MedicoViewModel(string especializacao, string crm, PessoaViewModel pessoa) : base()
        {
            Especializacao = especializacao;
            CRM = crm;
            Pessoa = pessoa;
        }

        public string Especializacao { get; set; }
        public string CRM { get; set; }
        public int PessoaID { get; set; }
        public PessoaViewModel Pessoa { get; set; }
    }
}
