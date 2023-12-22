using Consultorio.API.Model.Enum;

namespace Consultorio.API.ViewModel
{
    public class PessoaViewModel
    {
        public PessoaViewModel() { }
        public PessoaViewModel(string nome, string? nomeSocial, string cpf, DateTime dataNascimento, string? email, TipoSanguineo? tipoSanguineo, Genero genero, string? cep, string? bairro, string? endereco, string? telefone)
        {
            Nome = nome;
            NomeSocial = nomeSocial;
            CPF = cpf;
            DataNascimento = dataNascimento;
            Email = email;
            TipoSanguineo = tipoSanguineo;
            Genero = genero;
            CEP = cep;
            Bairro = bairro;
            Endereco = endereco;
            Telefone = telefone;
        }

        public int? Id { get; set; }
        public string Nome { get; set; }
        public string? NomeSocial { get; set; }
        public string CPF { get; set; }
        public DateTime DataNascimento { get; set; }
        public string? Email { get; set; }
        public TipoSanguineo? TipoSanguineo { get; set; }
        public Genero Genero { get; set; }
        public string? CEP { get; set; }
        public string? Bairro { get; set; }
        public string? Endereco { get; set; }
        public string? Telefone { get; set; }
    }
}
