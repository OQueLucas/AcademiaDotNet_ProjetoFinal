using Microsoft.AspNetCore.Mvc;
using Consultorio.API.Model;
using Consultorio.API.Interfaces;
using Consultorio.API.ViewModel;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;

namespace Consultorio.API.Controllers
{
    [Authorize(Roles = "Medico, Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class SintomasController : MainController
    {
        private readonly ISintomaService _sintomaService;
        private readonly IMapper _mapper;

        public SintomasController(ISintomaService sintomaService, IMapper mapper, INotificador notificador) : base(notificador)
        {
            _sintomaService = sintomaService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sintoma>>> GetSintomas()
        {
            var sintoma = await _sintomaService.BuscarTodos();

            if (sintoma == null)
            {
                NotificarErro("Nenhum sintoma foi encontrado!");
            }

            return CustomResponse(sintoma);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Sintoma>> GetSintoma(int id)
        {
            var result = await _sintomaService.BuscaId(id);

            if (result == null)
            {
                NotificarErro("Nenhum sintoma foi encontrado!");
            }

            return CustomResponse(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSintoma(int id, Sintoma sintoma)
        {
            if (sintoma.Id != id)
            {
                NotificarErro("Os Ids informados não são iguais!");
                return CustomResponse();
            }

            var sintomaEncontrado = await _sintomaService.BuscaId(id);

            if (sintomaEncontrado == null)
            {
                NotificarErro("Sintoma não encontrado!");
                return CustomResponse();
            }

            await _sintomaService.Atualizar(sintoma);
            return CustomResponse(sintoma);
        }

        [HttpPost]
        public async Task<ActionResult<Sintoma>> PostSintoma(SintomaViewModel sintoma)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            await _sintomaService.Adicionar(_mapper.Map<Sintoma>(sintoma));
            return CustomResponse(sintoma);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSintoma(int id)
        {
            var sintomaEncontrado = await _sintomaService.BuscaId(id);

            if (sintomaEncontrado == null)
            {
                NotificarErro("Sintoma não encontrado!");
                return CustomResponse();
            }

            await _sintomaService.Remover(sintomaEncontrado);
            return CustomResponse();
        }
    }
}
