namespace Consultorio.API.ViewModel.UserViewModel
{
    public class UserRoleCreateViewModel
    {
        public string Email { get; set; }
        public ICollection<string> Roles { get; set; }
    }
}
