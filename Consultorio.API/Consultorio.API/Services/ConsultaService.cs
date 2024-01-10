using Consultorio.API.Interfaces;
using Consultorio.API.Model;

namespace Consultorio.API.Services
{
    public class ConsultaService : BaseService, IConsultaService
    {
        private readonly IConsultaRepository _consultaRepository;

        public ConsultaService(IConsultaRepository consultaRepository, INotificador notificador) : base(notificador)
        {
            _consultaRepository = consultaRepository;
        }

        public async Task Adicionar(Consulta consulta)
        {
            await _consultaRepository.Add(consulta);
        }

        public async Task Atualizar(Consulta consulta)
        {
            await _consultaRepository.Update(consulta);
        }

        public async Task AtualizarSintoma(Consulta consulta)
        {
            await _consultaRepository.UpdateSintomas(consulta);
        }

        public async Task<bool> Remover(Consulta consulta)
        {
            if (await _consultaRepository.Remove(consulta)) return true;

            Notificar("Não foi possível remover a consulta");
            return false;
        }

        public async Task<Consulta> BuscaId(int id)
        {
            return await _consultaRepository.GetById(id);
        }

        public async Task<ICollection<Consulta>> BuscarTodos()
        {
            return await _consultaRepository.GetAll();
        }
    }
}
