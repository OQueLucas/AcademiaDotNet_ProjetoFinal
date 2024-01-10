using Consultorio.API.Interfaces;
using Consultorio.API.Model;

namespace Consultorio.API.Services
{
    public class SintomaService : BaseService, ISintomaService
    {
        private readonly ISintomaRepository _sintomaRepository;

        public SintomaService(ISintomaRepository sintomaRepository, INotificador notificador) : base(notificador)
        {
            _sintomaRepository = sintomaRepository;
        }

        public async Task Adicionar(Sintoma sintoma)
        {
            if (_sintomaRepository.GetBy(m => m.Nome == sintoma.Nome).Result.Any()) throw new Exception("Já possui este sintoma no sistema!");

            await _sintomaRepository.Add(sintoma);
        }

        public async Task Atualizar(Sintoma sintoma)
        {
            await _sintomaRepository.Update(sintoma);
        }

        public async Task<bool> Remover(Sintoma sintoma)
        {
            if (await _sintomaRepository.Remove(sintoma)) return true;

            Notificar("Não foi possível remover o sintoma");
            return false;
        }

        public async Task<Sintoma> BuscaId(int id)
        {
            return await _sintomaRepository.GetById(id);
        }

        public async Task<ICollection<Sintoma>> BuscarTodos()
        {
            return await _sintomaRepository.GetAll();
        }
    }
}
