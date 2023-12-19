using Consultorio.API.Model.Enum;

namespace Consultorio.API.ViewModel
{
    public class PessoaViewModel
    {
        public PessoaViewModel() { }
        public PessoaViewModel(string nome, string? nomeSocial, string cPF, DateTime dataNascimento, string? email, TipoSanguineo? tipoSanguineo, Genero genero, string cEP, string bairro, string endereco, string telefone)
        {
            Nome = nome;
            NomeSocial = nomeSocial;
            CPF = cPF;
            DataNascimento = dataNascimento;
            Email = email;
            TipoSanguineo = tipoSanguineo;
            Genero = genero;
            CEP = cEP;
            Bairro = bairro;
            Endereco = endereco;
            Telefone = telefone;
        }

        public int? ID { get; set; }
        public string Nome { get; set; }
        public string? NomeSocial { get; set; }
        public string CPF { get; set; }
        public DateTime DataNascimento { get; set; }
        public string? Email { get; set; }
        public TipoSanguineo? TipoSanguineo { get; set; }
        public Genero Genero { get; set; }
        public string CEP { get; set; }
        public string Bairro { get; set; }
        public string Endereco { get; set; }
        public string Telefone { get; set; }
    }
}
