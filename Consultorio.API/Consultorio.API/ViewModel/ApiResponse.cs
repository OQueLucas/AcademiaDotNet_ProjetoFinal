namespace Consultorio.API.ViewModel
{
    public class ApiResponse
    {
        public bool IsSuccess { get; set; }
        public string? Message { get; set; }
        public int StatusCode { get; set; }
        public object? Response { get; set; }
        public IEnumerable<string>? Errors { get; set; }
    }
}
