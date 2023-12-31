namespace Consultorio.API.ViewModel.Consulta
{
    public class SintomaConsultaEdicaoViewModel : SintomaConsultaCriacaoViewModel
    {
        public int? Id { get; set; }
        public int ConsultaId { get; set; }
    }
}
