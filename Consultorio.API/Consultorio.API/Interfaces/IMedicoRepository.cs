using Consultorio.API.Model;

namespace Consultorio.API.Interfaces
{
    public interface IMedicoRepository : IRepository<Medico>
    {
        public Task<List<Medico>> GetAll();
        public Task<Medico> GetByCRM(string crm);
        public Task<Medico> GetById(int id);
        public Task<Medico> ObterMedicoConsultas(int id);

    }
}
