using Consultorio.API.Interfaces;
using Consultorio.API.Model;
using Consultorio.API.Repository;

namespace Consultorio.API.Services
{
    public class MedicoService : BaseService, IMedicoService
    {
        private readonly IMedicoRepository _medicoRepository;

        public MedicoService(IMedicoRepository medicoRepository, INotificador notificador) : base(notificador)
        {
            _medicoRepository = medicoRepository;
        }

        public async Task Adicionar(Medico medico)
        {
            if (_medicoRepository.GetBy(m => m.CRM == medico.CRM).Result.Any()) throw new Exception("Já possui medico com este CRM!");

            if (_medicoRepository.GetBy(m => m.Pessoa.CPF == medico.Pessoa.CPF).Result.Any()) throw new Exception("Já possui pessoa cadastrada com este CPF!");

            await _medicoRepository.Add(medico);
        }

        public async Task Atualizar(Medico medico)
        {
            await _medicoRepository.Update(medico);
        }

        public async Task<bool> Remover(Medico medico)
        {
            if (_medicoRepository.ObterMedicoConsultas(medico.Id).Result.Consultas.Any())
            {
                Notificar("O paciente possui consultas cadastradas");
                return false;
            }

            if (await _medicoRepository.Remove(medico)) return true;

            return false;
        }

        public async Task<Medico> BuscaId(int id)
        {
            return await _medicoRepository.GetById(id);
        }

        public async Task<Medico> BuscaCRM(string crm)
        {
            return await _medicoRepository.GetByCRM(crm);
        }

        public async Task<ICollection<Medico>> BuscarTodos()
        {
            return await _medicoRepository.GetAll();
        }
    }
}
