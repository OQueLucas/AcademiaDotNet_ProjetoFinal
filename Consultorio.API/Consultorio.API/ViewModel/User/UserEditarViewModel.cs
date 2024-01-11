using System.ComponentModel.DataAnnotations;

namespace Consultorio.API.ViewModel.User
{
    public class UserEditarViewModel
    {
        public string Id { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }
}
