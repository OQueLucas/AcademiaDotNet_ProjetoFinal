using Consultorio.API.ViewModel;
using Consultorio.API.ViewModel.User;
using Microsoft.AspNetCore.Identity;

namespace Consultorio.API.Interfaces
{
    public interface IUserService
    {
        Task<UserLoginResponseViewModel> GerarJwt(string email);
        Task AtribuirRoles(IdentityUser user, ICollection<string> roles);

    }
}
