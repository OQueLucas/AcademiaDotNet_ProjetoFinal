using AutoMapper;
using Consultorio.API.Interfaces;
using Consultorio.API.ViewModel.UserViewModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Consultorio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : MainController
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IMapper _mapper;

        private readonly IUserService _userService;

        public AdminController(INotificador notificador, UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, IUserService userService, IMapper mapper) : base(notificador)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _userService = userService;
            _mapper = mapper;
        }

        [HttpGet("Usuario")]
        public async Task<ActionResult<UserViewModel>> ListarUsuarios()
        {
            var users = _userManager.Users.ToList();
            return CustomResponse(users);
        }

        [HttpGet("Usuario/{id}")]
        public async Task<IActionResult> ObterUsuario(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                NotificarErro("Usuário não encontrado");
                return CustomResponse(user);
            }

            var response = new UserViewModel
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                EmailConfirmed = user.EmailConfirmed,
                PhoneNumber = user.PhoneNumber,
                PhoneNumberConfirmed = user.PhoneNumberConfirmed
            };

            return CustomResponse(response);
        }

        [HttpDelete("Usuario/{id}")]
        public async Task<IActionResult> ListarUsuarios(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                NotificarErro("Usuário não encontrado");
                return CustomResponse(user);
            }

            var result = await _userManager.DeleteAsync(user);
            if (result.Succeeded)
            {
                return CustomResponse(user);
            }

            foreach (var error in result.Errors)
            {
                NotificarErro(error.Description);
            }

            return CustomResponse(result);
        }

        [HttpGet("Role/{userId}")]
        public async Task<ActionResult<RolesViewModel>> ListarRoles(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                NotificarErro("Usuário não encontrado");
                return CustomResponse(user);
            }

            var result = new List<UserRolesViewModel>();

            foreach(var role in _roleManager.Roles)
            {
                var userRole = new UserRolesViewModel
                {
                    Id = role.Id,
                    Name = role.Name,
                };

                if (await _userManager.IsInRoleAsync(user, role.Name))
                {
                    userRole.IsSelected = true;
                }
                else
                {
                    userRole.IsSelected = false;
                }
                result.Add(userRole);
            }

            return CustomResponse(result);
        }

        [HttpGet("Role")]
        public async Task<ActionResult<RolesViewModel>> ListarRoles()
        {
            var roles = _roleManager.Roles.ToList();
            return CustomResponse(roles);
        }

        [HttpPost("Role")]
        public async Task<ActionResult> AdicionarRoleUsuario([FromBody] UserRoleCreateViewModel userRole)
        {
            var user = await _userManager.FindByEmailAsync(userRole.Email);

            var assignedRole = new List<string>();

            await _userService.AtribuirRoles(user, userRole.Roles);

            return CustomResponse(assignedRole);
        }
    }
}
