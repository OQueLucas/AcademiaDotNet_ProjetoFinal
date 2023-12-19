using Consultorio.API.Model;

namespace Consultorio.API.Interfaces
{
    public interface IMedicoService : IDisposable
    {
        Task Adicionar(Medico medico);
        Task Atualizar(Medico medico);
        Task Remover(int id);
    }
}
