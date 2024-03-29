﻿using Consultorio.API.Interfaces;
using Consultorio.API.ViewModel.Role;
using Consultorio.API.ViewModel.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Consultorio.API.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : MainController
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AdminController(INotificador notificador, UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager) : base(notificador)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [HttpGet("Usuario")]
        public async Task<ActionResult<UserViewModel>> ListarUsuarios()
        {
            var users = _userManager.Users.ToList();

            if (users == null)
            {
                NotificarErro("Nenhum usuário encontrado");
            }

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

        [HttpPut("Usuario/{id}")]
        public async Task<IActionResult> EditarUsuario(UserEditarViewModel model)
        {
            var user = await _userManager.FindByIdAsync(model.Id);

            if (user == null)
            {
                NotificarErro("Usuário não encontrado");
                return CustomResponse(user);
            }

            user.Email = model.Email;
            user.UserName = model.UserName;
            user.PhoneNumber = model.PhoneNumber;

            var result = await _userManager.UpdateAsync(user);

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

        [HttpDelete("Usuario/{id}")]
        public async Task<IActionResult> DeletarUsuario(string id)
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

        [HttpGet("Role")]
        public async Task<ActionResult<RolesViewModel>> ListarRoles()
        {
            var roles = _roleManager.Roles.ToList();
            return CustomResponse(roles);
        }

        [HttpGet("Role/{id}")]
        public async Task<ActionResult<RolesViewModel>> ObterRole(string id)
        {
            var role = await _roleManager.FindByIdAsync(id);

            if (role == null)
            {
                NotificarErro("Role não encontrado");
                return CustomResponse(role);
            }

            return CustomResponse(role);
        }

        [HttpPost("Role")]
        public async Task<ActionResult<RolesViewModel>> AdicionarRoles([FromBody] string nome)
        {
            var role = await _roleManager.FindByNameAsync(nome);

            if (role != null)
            {
                NotificarErro("Role já existente");
                return CustomResponse(role);
            }

            IdentityRole newRole = new (nome);

            var result = await _roleManager.CreateAsync(newRole);

            return CustomResponse(result);
        }

        [HttpPut("Role/{id}")]
        public async Task<ActionResult<RolesViewModel>> EditarRoles(RolesViewModel model)
        {
            var role = await _roleManager.FindByIdAsync(model.Id);

            if (role == null)
            {
                NotificarErro("Role não encontrado");
                return CustomResponse(role);
            }

            role.Name = model.Nome;
            var result = await _roleManager.UpdateAsync(role);

            return CustomResponse(result);
        }

        [HttpGet("Role/usuario/{userId}")]
        public async Task<ActionResult<RolesViewModel>> ListarUserRoles(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                NotificarErro("Usuário não encontrado");
                return CustomResponse(user);
            }

            var result = new List<UserRolesViewModel>();

            foreach (var role in _roleManager.Roles)
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

        [HttpPost("Role/usuario/{userId}")]
        public async Task<ActionResult> AdicionarRoleUsuario([FromBody] List<UserRolesViewModel> roles, string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                NotificarErro("Usuário não encontrado");
                return CustomResponse(user);
            }

            var userRoles = await _userManager.GetRolesAsync(user);
            var result = await _userManager.RemoveFromRolesAsync(user, userRoles);

            if (!result.Succeeded)
            {
                NotificarErro("Não foi possível remover as regras existentes!");
                return CustomResponse(result);
            }

            result = await _userManager.AddToRolesAsync(user, roles.Where(role => role.IsSelected).Select(role => role.Name));

            if (!result.Succeeded)
            {
                NotificarErro("Não foi possível adicionar as regras selecionadas!");
                return CustomResponse(result);
            }

            return CustomResponse(result);
        }
    }
}
