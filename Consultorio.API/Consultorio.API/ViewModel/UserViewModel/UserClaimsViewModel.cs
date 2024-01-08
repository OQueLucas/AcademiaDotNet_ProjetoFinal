namespace Consultorio.API.ViewModel.UserViewModel
{
    public class UserClaimsViewModel
    {
        public string UserId { get; set; }
        public ICollection<ClaimViewModel> Claims { get; set; }
    }
}
