using Consultorio.API.Interfaces;
using Consultorio.API.Model;
using Consultorio.API.Repository;

namespace Consultorio.API.Services
{
    public class MedicoService : IMedicoService
    {
        private readonly IMedicoRepository _medicoRepository;

        public MedicoService(IMedicoRepository medicoRepository)
        {
            _medicoRepository = medicoRepository;
        }

        public async Task Adicionar(Medico medico)
        {
            await _medicoRepository.Add(medico);
        }

        public Task Atualizar(Medico medico)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public Task Remover(int id)
        {
            throw new NotImplementedException();
        }
    }
}
