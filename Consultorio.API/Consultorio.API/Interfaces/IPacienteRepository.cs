using Consultorio.API.Model;

namespace Consultorio.API.Interfaces
{
    public interface IPacienteRepository : IRepository<Paciente>
    {
        public Task<List<Paciente>> GetAll();
        public Task<Paciente> GetById(int id);
        public Task<Paciente> ObterPacienteConsultas(int id);
    }
}
