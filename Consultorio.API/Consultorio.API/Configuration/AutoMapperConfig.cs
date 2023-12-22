using AutoMapper;
using Consultorio.API.Model;
using Consultorio.API.ViewModel;

namespace Consultorio.API.Configuration
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<Pessoa, PessoaViewModel>().ReverseMap();
            CreateMap<Medico, MedicoViewModel>().ReverseMap();
            CreateMap<Paciente, PacienteViewModel>().ReverseMap();
            CreateMap<Consulta, ConsultaViewModel>().ReverseMap();
            CreateMap<SintomaConsulta, SintomaConsultaViewModel>().ReverseMap();
        }
    }
}
