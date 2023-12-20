using Consultorio.API.Interfaces;
using Consultorio.API.Model;

namespace Consultorio.API.Services
{
    public class PacienteService : IPacienteService
    {
        private readonly IPacienteRepository _pacienteRepository;

        public PacienteService(IPacienteRepository pacienteRepository)
        {
            _pacienteRepository = pacienteRepository;
        }

        public async Task Adicionar(Paciente paciente)
        {
            if (_pacienteRepository.GetBy(m => m.Pessoa.CPF == paciente.Pessoa.CPF).Result.Any()) throw new Exception("Já possui pessoa cadastrada com este CPF!");

            await _pacienteRepository.Add(paciente);
        }

        public async Task Atualizar(Paciente paciente)
        {
            await _pacienteRepository.Update(paciente);
        }

        public async Task<bool> Remover(Paciente paciente)
        {
            if (await _pacienteRepository.Remove(paciente)) return true;

            return false;
        }

        public async Task<Paciente> BuscaId(int id)
        {
            return await _pacienteRepository.GetById(id);
        }

        public async Task<ICollection<Paciente>> BuscarTodos()
        {
            return await _pacienteRepository.GetAll();
        }
    }
}
