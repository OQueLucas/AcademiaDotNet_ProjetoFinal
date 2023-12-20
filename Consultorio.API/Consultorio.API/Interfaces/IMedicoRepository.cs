using Consultorio.API.Model;

namespace Consultorio.API.Interfaces
{
    public interface IMedicoRepository : IRepository<Medico>
    {
        public Task<Medico> FindByCRM(string crm);
        public Task<Medico> GetById(int id);

    }
}
