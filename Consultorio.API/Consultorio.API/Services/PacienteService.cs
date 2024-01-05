using Consultorio.API.Interfaces;
using Consultorio.API.Model;

namespace Consultorio.API.Services
{
    public class PacienteService : BaseService, IPacienteService
    {
        private readonly IPacienteRepository _pacienteRepository;

        public PacienteService(IPacienteRepository pacienteRepository, INotificador notificador) : base(notificador)
        {
            _pacienteRepository = pacienteRepository;

        }

        public async Task<bool> Adicionar(Paciente paciente)
        {
            if (_pacienteRepository.GetBy(m => m.Pessoa.CPF == paciente.Pessoa.CPF).Result.Any())
            {
                Notificar("CPF já cadastrado no sistema!");
                return false;
            }

            await _pacienteRepository.Add(paciente);
            return true;
        }

        public async Task<bool> Atualizar(Paciente paciente)
        {
            var pacienteExiste = await BuscaId(paciente.Id);
            if (pacienteExiste == null)
            {
                Notificar("Paciente não encontrado");
                return false;
            }

            await _pacienteRepository.Update(paciente);
            return true;
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
