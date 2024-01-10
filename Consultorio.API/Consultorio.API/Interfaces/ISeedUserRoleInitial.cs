namespace Consultorio.API.Interfaces
{
    public interface ISeedUserRoleInitial
    {
        Task SeedRolesAsync();
        Task SeedUsersAsync();
    }
}
