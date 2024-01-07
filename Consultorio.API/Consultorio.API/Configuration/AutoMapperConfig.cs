using AutoMapper;
using Consultorio.API.Model;
using Consultorio.API.ViewModel;
using Consultorio.API.ViewModel.Consulta;
using Consultorio.API.ViewModel.Medico;
using Consultorio.API.ViewModel.Paciente;

namespace Consultorio.API.Configuration
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<Medico, MedicoViewModel>()
                .ForMember(dest => dest.PessoaId, opts => opts.MapFrom(src => src.Pessoa.Id))
                .ForMember(dest => dest.Nome, opts => opts.MapFrom(src => src.Pessoa.Nome))
                .ForMember(dest => dest.NomeSocial, opts => opts.MapFrom(src => src.Pessoa.NomeSocial))
                .ForMember(dest => dest.CPF, opts => opts.MapFrom(src => src.Pessoa.CPF))
                .ForMember(dest => dest.DataNascimento, opts => opts.MapFrom(src => src.Pessoa.DataNascimento))
                .ForMember(dest => dest.Email, opts => opts.MapFrom(src => src.Pessoa.Email))
                .ForMember(dest => dest.TipoSanguineo, opts => opts.MapFrom(src => src.Pessoa.TipoSanguineo))
                .ForMember(dest => dest.Genero, opts => opts.MapFrom(src => src.Pessoa.Genero))
                .ForMember(dest => dest.CEP, opts => opts.MapFrom(src => src.Pessoa.CEP))
                .ForMember(dest => dest.Bairro, opts => opts.MapFrom(src => src.Pessoa.Bairro))
                .ForMember(dest => dest.Endereco, opts => opts.MapFrom(src => src.Pessoa.Endereco))
                .ForMember(dest => dest.Telefone, opts => opts.MapFrom(src => src.Pessoa.Telefone))
                .ReverseMap();

            CreateMap<Medico, MedicoCriacaoViewModel>()
                .ForMember(dest => dest.Nome, opts => opts.MapFrom(src => src.Pessoa.Nome))
                .ForMember(dest => dest.NomeSocial, opts => opts.MapFrom(src => src.Pessoa.NomeSocial))
                .ForMember(dest => dest.CPF, opts => opts.MapFrom(src => src.Pessoa.CPF))
                .ForMember(dest => dest.DataNascimento, opts => opts.MapFrom(src => src.Pessoa.DataNascimento))
                .ForMember(dest => dest.Email, opts => opts.MapFrom(src => src.Pessoa.Email))
                .ForMember(dest => dest.TipoSanguineo, opts => opts.MapFrom(src => src.Pessoa.TipoSanguineo))
                .ForMember(dest => dest.Genero, opts => opts.MapFrom(src => src.Pessoa.Genero))
                .ForMember(dest => dest.CEP, opts => opts.MapFrom(src => src.Pessoa.CEP))
                .ForMember(dest => dest.Bairro, opts => opts.MapFrom(src => src.Pessoa.Bairro))
                .ForMember(dest => dest.Endereco, opts => opts.MapFrom(src => src.Pessoa.Endereco))
                .ForMember(dest => dest.Telefone, opts => opts.MapFrom(src => src.Pessoa.Telefone))
                .ReverseMap();

            CreateMap<Medico, MedicoEdicaoViewModel>()
                .ForMember(dest => dest.PessoaId, opts => opts.MapFrom(src => src.Pessoa.Id))
                .ForMember(dest => dest.Nome, opts => opts.MapFrom(src => src.Pessoa.Nome))
                .ForMember(dest => dest.NomeSocial, opts => opts.MapFrom(src => src.Pessoa.NomeSocial))
                .ForMember(dest => dest.CPF, opts => opts.MapFrom(src => src.Pessoa.CPF))
                .ForMember(dest => dest.DataNascimento, opts => opts.MapFrom(src => src.Pessoa.DataNascimento))
                .ForMember(dest => dest.Email, opts => opts.MapFrom(src => src.Pessoa.Email))
                .ForMember(dest => dest.TipoSanguineo, opts => opts.MapFrom(src => src.Pessoa.TipoSanguineo))
                .ForMember(dest => dest.Genero, opts => opts.MapFrom(src => src.Pessoa.Genero))
                .ForMember(dest => dest.CEP, opts => opts.MapFrom(src => src.Pessoa.CEP))
                .ForMember(dest => dest.Bairro, opts => opts.MapFrom(src => src.Pessoa.Bairro))
                .ForMember(dest => dest.Endereco, opts => opts.MapFrom(src => src.Pessoa.Endereco))
                .ForMember(dest => dest.Telefone, opts => opts.MapFrom(src => src.Pessoa.Telefone))
                .ReverseMap();

            CreateMap<Paciente, PacienteCriacaoViewModel>()
                .ForMember(dest => dest.Nome, opts => opts.MapFrom(src => src.Pessoa.Nome))
                .ForMember(dest => dest.NomeSocial, opts => opts.MapFrom(src => src.Pessoa.NomeSocial))
                .ForMember(dest => dest.CPF, opts => opts.MapFrom(src => src.Pessoa.CPF))
                .ForMember(dest => dest.DataNascimento, opts => opts.MapFrom(src => src.Pessoa.DataNascimento))
                .ForMember(dest => dest.Email, opts => opts.MapFrom(src => src.Pessoa.Email))
                .ForMember(dest => dest.TipoSanguineo, opts => opts.MapFrom(src => src.Pessoa.TipoSanguineo))
                .ForMember(dest => dest.Genero, opts => opts.MapFrom(src => src.Pessoa.Genero))
                .ForMember(dest => dest.CEP, opts => opts.MapFrom(src => src.Pessoa.CEP))
                .ForMember(dest => dest.Bairro, opts => opts.MapFrom(src => src.Pessoa.Bairro))
                .ForMember(dest => dest.Endereco, opts => opts.MapFrom(src => src.Pessoa.Endereco))
                .ForMember(dest => dest.Telefone, opts => opts.MapFrom(src => src.Pessoa.Telefone))
                .ReverseMap();

            CreateMap<Paciente, PacienteEdicaoViewModel>()
                .ForMember(dest => dest.PessoaId, opts => opts.MapFrom(src => src.Pessoa.Id))
                .ForMember(dest => dest.Nome, opts => opts.MapFrom(src => src.Pessoa.Nome))
                .ForMember(dest => dest.NomeSocial, opts => opts.MapFrom(src => src.Pessoa.NomeSocial))
                .ForMember(dest => dest.CPF, opts => opts.MapFrom(src => src.Pessoa.CPF))
                .ForMember(dest => dest.DataNascimento, opts => opts.MapFrom(src => src.Pessoa.DataNascimento))
                .ForMember(dest => dest.Email, opts => opts.MapFrom(src => src.Pessoa.Email))
                .ForMember(dest => dest.TipoSanguineo, opts => opts.MapFrom(src => src.Pessoa.TipoSanguineo))
                .ForMember(dest => dest.Genero, opts => opts.MapFrom(src => src.Pessoa.Genero))
                .ForMember(dest => dest.CEP, opts => opts.MapFrom(src => src.Pessoa.CEP))
                .ForMember(dest => dest.Bairro, opts => opts.MapFrom(src => src.Pessoa.Bairro))
                .ForMember(dest => dest.Endereco, opts => opts.MapFrom(src => src.Pessoa.Endereco))
                .ForMember(dest => dest.Telefone, opts => opts.MapFrom(src => src.Pessoa.Telefone))
                .ReverseMap();

            CreateMap<Paciente, PacienteViewModel>()
                .ForMember(dest => dest.Nome, opts => opts.MapFrom(src => src.Pessoa.Nome))
                .ForMember(dest => dest.NomeSocial, opts => opts.MapFrom(src => src.Pessoa.NomeSocial))
                .ForMember(dest => dest.CPF, opts => opts.MapFrom(src => src.Pessoa.CPF))
                .ForMember(dest => dest.DataNascimento, opts => opts.MapFrom(src => src.Pessoa.DataNascimento))
                .ForMember(dest => dest.Email, opts => opts.MapFrom(src => src.Pessoa.Email))
                .ForMember(dest => dest.TipoSanguineo, opts => opts.MapFrom(src => src.Pessoa.TipoSanguineo))
                .ForMember(dest => dest.Genero, opts => opts.MapFrom(src => src.Pessoa.Genero))
                .ForMember(dest => dest.CEP, opts => opts.MapFrom(src => src.Pessoa.CEP))
                .ForMember(dest => dest.Bairro, opts => opts.MapFrom(src => src.Pessoa.Bairro))
                .ForMember(dest => dest.Endereco, opts => opts.MapFrom(src => src.Pessoa.Endereco))
                .ForMember(dest => dest.Telefone, opts => opts.MapFrom(src => src.Pessoa.Telefone))
                .ReverseMap();

            CreateMap<Consulta, PacienteConsultaViewModel>()
                .ForMember(dest => dest.MedicoCRM, opts => opts.MapFrom(src => src.Medico.CRM))
                .ForMember(dest => dest.Especializacao, opts => opts.MapFrom(src => src.Medico.Especializacao))
                .ForMember(dest => dest.MedicoNome, opts => opts.MapFrom(src => src.Medico.Pessoa.Nome))
                .ForMember(dest => dest.MedicoNomeSocial, opts => opts.MapFrom(src => src.Medico.Pessoa.NomeSocial))
                .ReverseMap();

            CreateMap<Sintoma, SintomaViewModel>()
                .ForMember(dest => dest.Nome, opts => opts.MapFrom(src => src.Nome))
                .ReverseMap();

            CreateMap<Consulta, ConsultaCriacaoViewModel>()
                .ReverseMap();

            CreateMap<Consulta, ConsultaEdicaoViewModel>()
                .ReverseMap();

            CreateMap<Consulta, ConsultaViewModel>()
                .ForMember(dest => dest.Especializacao, opts => opts.MapFrom(src => src.Medico.Especializacao))
                .ForMember(dest => dest.MedicoNome, opts => opts.MapFrom(src => src.Medico.Pessoa.Nome))
                .ForMember(dest => dest.MedicoNomeSocial, opts => opts.MapFrom(src => src.Medico.Pessoa.NomeSocial))
                .ForMember(dest => dest.Nome, opts => opts.MapFrom(src => src.Paciente.Pessoa.Nome))
                .ForMember(dest => dest.NomeSocial, opts => opts.MapFrom(src => src.Paciente.Pessoa.NomeSocial))
                .ForMember(dest => dest.CPF, opts => opts.MapFrom(src => src.Paciente.Pessoa.CPF))
                .ForMember(dest => dest.DataNascimento, opts => opts.MapFrom(src => src.Paciente.Pessoa.DataNascimento))
                .ForMember(dest => dest.Email, opts => opts.MapFrom(src => src.Paciente.Pessoa.Email))
                .ForMember(dest => dest.TipoSanguineo, opts => opts.MapFrom(src => src.Paciente.Pessoa.TipoSanguineo))
                .ForMember(dest => dest.Genero, opts => opts.MapFrom(src => src.Paciente.Pessoa.Genero))
                .ReverseMap();

            CreateMap<SintomaConsulta, SintomaConsultaCriacaoViewModel>()
                .ReverseMap();

            CreateMap<SintomaConsulta, SintomaConsultaEdicaoViewModel>()
                .ReverseMap();

            CreateMap<SintomaConsulta, SintomaConsultaViewModel>()
                .ForMember(dest => dest.SintomaId, opts => opts.MapFrom(src => src.Sintoma.Id))
                .ForMember(dest => dest.Nome, opts => opts.MapFrom(src => src.Sintoma.Nome))
                .ReverseMap();
        }
    }
}
