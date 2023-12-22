using Consultorio.API.Model;

namespace Consultorio.API.Interfaces
{
    public interface ISintomaRepository : IRepository<Sintoma>
    {
        public Task<Sintoma> GetById(int id);
    }
}
