using AutoMapper;
using Consultorio.API.Model;
using Consultorio.API.ViewModel;

namespace Consultorio.API.Configuration
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig() {
            CreateMap<Medico, MedicoViewModel>().ReverseMap();
            CreateMap<Pessoa, PessoaViewModel>().ReverseMap();
        }
    }
}
