using Consultorio.API.ViewModel;
using Consultorio.API.ViewModel.UserViewModel;
using Microsoft.AspNetCore.Identity;

namespace Consultorio.API.Interfaces
{
    public interface IUserService
    {
        Task<LoginResponseViewModel> GerarJwt(string email);
        Task AtribuirRoles(IdentityUser user, ICollection<string> roles);

    }
}
