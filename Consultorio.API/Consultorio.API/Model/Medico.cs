using System.ComponentModel.DataAnnotations.Schema;

namespace Consultorio.API.Model
{
    public class Medico : Entity
    {
        public Medico()
        {
        }

        public Medico(string especializacao, string crm) : base()
        {
            Especializacao = especializacao;
            CRM = crm;
        }

        public string Especializacao { get; set; }

        [Column(TypeName = "varchar(7)")]
        public string CRM { get; set; }

        public int PessoaID { get; set; }

        public virtual Pessoa Pessoa { get; set; }

        public virtual ICollection<Consulta>? Consultas { get; set; }
    }
}
