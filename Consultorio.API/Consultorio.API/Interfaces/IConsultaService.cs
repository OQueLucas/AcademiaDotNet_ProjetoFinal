using Consultorio.API.Model;

namespace Consultorio.API.Interfaces
{
    public interface IConsultaService
    {
        Task<ICollection<Consulta>> BuscarTodos();
        Task Adicionar(Consulta consulta);
        Task<Consulta> BuscaId(int id);
        Task Atualizar(Consulta consulta);
        Task<bool> Remover(Consulta consulta);
    }
}
