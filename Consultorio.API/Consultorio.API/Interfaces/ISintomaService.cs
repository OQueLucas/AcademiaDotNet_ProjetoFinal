using Consultorio.API.Model;

namespace Consultorio.API.Interfaces
{
    public interface ISintomaService
    {
        Task<ICollection<Sintoma>> BuscarTodos();
        Task Adicionar(Sintoma sintoma);
        Task<Sintoma> BuscaId(int id);
        Task Atualizar(Sintoma sintoma);
        Task<bool> Remover(Sintoma sintoma);
    }
}
