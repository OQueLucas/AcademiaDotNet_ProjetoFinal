﻿using Consultorio.API.Model.Enum;

namespace Consultorio.API.ViewModel.Medico
{
    public class MedicoCriacaoViewModel
    {
        public string CRM { get; set; }
        public string Especializacao { get; set; }
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
