using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Consultorio.API.Model
{
    public class Medico
    {
        public string Especializacao { get; set; }

        
        [Column(TypeName = "varchar(7)")]
        public string CRM { get; set; }

        public int PessoaID { get; set; }

        public virtual Pessoa Pessoa { get; set; }

        public virtual ICollection<Consulta>? Consultas { get; set; }
    }
}
