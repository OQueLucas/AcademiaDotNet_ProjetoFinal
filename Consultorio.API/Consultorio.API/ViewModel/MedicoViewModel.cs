using System.ComponentModel.DataAnnotations;

namespace Consultorio.API.ViewModel
{
    public class MedicoViewModel
    {
        public MedicoViewModel()
        {
        }
        public MedicoViewModel(string especializacao, string crm) : base()
        {
            Especializacao = especializacao;
            CRM = crm;
        }

        [Key]
        public int? Id { get; set; }
        public string Especializacao { get; set; }
        public string CRM { get; set; }
        public int PessoaID { get; set; }
        public PessoaViewModel Pessoa { get; set; }
    }
}
