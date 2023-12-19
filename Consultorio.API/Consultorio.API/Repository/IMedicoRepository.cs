using Consultorio.API.Model;

namespace Consultorio.API.Repository
{
    public interface IMedicoRepository : IRepository<Medico>
    {
        public Task<Medico> FindByCRM(string crm);
        
    }
}
