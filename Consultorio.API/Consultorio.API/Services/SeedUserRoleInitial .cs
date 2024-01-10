using Consultorio.API.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Consultorio.API.Services
{
    public class SeedUserRoleInitial : ISeedUserRoleInitial
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public SeedUserRoleInitial(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task SeedRolesAsync()
        {
            if (!await _roleManager.RoleExistsAsync("Paciente"))
            {
                IdentityRole role = new IdentityRole();
                role.Name = "Paciente";
                role.NormalizedName = "PACIENTE";
                role.ConcurrencyStamp = Guid.NewGuid().ToString();

                IdentityResult roleResult = await _roleManager.CreateAsync(role);
            }

            if (!await _roleManager.RoleExistsAsync("Medico"))
            {
                IdentityRole role = new IdentityRole();
                role.Name = "Medico";
                role.NormalizedName = "MEDICO";
                role.ConcurrencyStamp = Guid.NewGuid().ToString();

                IdentityResult roleResult = await _roleManager.CreateAsync(role);
            }

            if (!await _roleManager.RoleExistsAsync("Admin"))
            {
                IdentityRole role = new IdentityRole();
                role.Name = "Admin";
                role.NormalizedName = "ADMIN";
                role.ConcurrencyStamp = Guid.NewGuid().ToString();

                IdentityResult roleResult = await _roleManager.CreateAsync(role);
            }
        }

        public async Task SeedUsersAsync()
        {
            if (await _userManager.FindByEmailAsync("paciente@teste.com.br") == null)
            {
                IdentityUser user = new IdentityUser();
                user.UserName = "paciente@teste.com.br";
                user.Email = "paciente@teste.com.br";
                user.NormalizedUserName = "PACIENTE@TESTE.COM.BR";
                user.NormalizedEmail = "PACIENTE@TESTE.COM.BR";
                user.EmailConfirmed = true;
                user.LockoutEnabled = false;
                user.SecurityStamp = Guid.NewGuid().ToString();

                IdentityResult result = await _userManager.CreateAsync(user, "Usuario123!");

                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, "Paciente");
                }
            }

            if (await _userManager.FindByEmailAsync("medico@teste.com.br") == null)
            {
                IdentityUser user = new IdentityUser();
                user.UserName = "medico@teste.com.br";
                user.Email = "medico@teste.com.br";
                user.NormalizedUserName = "MEDICO@TESTE.COM.BR";
                user.NormalizedEmail = "MEDICO@TESTE.COM.BR";
                user.EmailConfirmed = true;
                user.LockoutEnabled = false;
                user.SecurityStamp = Guid.NewGuid().ToString();

                IdentityResult result = await _userManager.CreateAsync(user, "Admin123!");

                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, "Medico");
                }
            }

            if (await _userManager.FindByEmailAsync("admin@teste.com.br") == null)
            {
                IdentityUser user = new IdentityUser();
                user.UserName = "admin@teste.com.br";
                user.Email = "admin@teste.com.br";
                user.NormalizedUserName = "ADMIN@TESTE.COM.BR";
                user.NormalizedEmail = "ADMIN@TESTE.COM.BR";
                user.EmailConfirmed = true;
                user.LockoutEnabled = false;
                user.SecurityStamp = Guid.NewGuid().ToString();

                IdentityResult result = await _userManager.CreateAsync(user, "Admin123!");

                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, "Admin");
                }
            }
        }
    }

}
