using Consultorio.API.Model;

namespace Consultorio.API.Interfaces
{
    public interface IConsultaRepository : IRepository<Consulta>
    {
        public Task<List<Consulta>> GetAll();
        public Task<Consulta> GetById(int id);
    }
}
