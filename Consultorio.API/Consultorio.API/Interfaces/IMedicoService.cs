using Consultorio.API.Model;

namespace Consultorio.API.Interfaces
{
    public interface IMedicoService
    {
        Task<ICollection<Medico>> BuscarTodos();
        Task Adicionar(Medico medico);
        Task<Medico> BuscaId(int id);
        Task<Medico> BuscaCRM(string crm);
        Task Atualizar(Medico medico);
        Task<bool> Remover(Medico medico);
    }
}
