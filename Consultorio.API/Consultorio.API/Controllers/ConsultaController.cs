using Microsoft.AspNetCore.Mvc;
using Consultorio.API.Model;
using AutoMapper;
using Consultorio.API.Interfaces;
using Consultorio.API.ViewModel.Consulta;
using Microsoft.AspNetCore.Authorization;

namespace Consultorio.API.Controllers
{
    [Authorize(Roles = "Medico, Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultaController : MainController
    {
        private readonly IConsultaService _consultaService;
        private readonly IMapper _mapper;

        public ConsultaController(IConsultaService consultaService, IMapper mapper, INotificador notificador) : base(notificador)
        {
            _consultaService = consultaService;
            _mapper = mapper;
        }

        // GET: api/Consulta
        [HttpGet]
        public async Task<IActionResult> GetConsulta()
        {
            var consulta = _mapper.Map<List<ConsultaViewModel>>(await _consultaService.BuscarTodos());

            if (consulta == null)
            {
                NotificarErro("Nenhuma consulta foi encontrada!");
            }

            return CustomResponse(consulta);
        }

        // GET: api/Consulta/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Consulta>> GetConsulta(int id)
        {
            var consulta = _mapper.Map<ConsultaViewModel>(await _consultaService.BuscaId(id));

            if (consulta == null)
            {
                NotificarErro("Consulta não encontrada!");
            }

            return CustomResponse(consulta);
        }

        // PUT: api/Consulta/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutConsulta(int id, ConsultaEdicaoViewModel consulta)
        {
            if (consulta.Id != id)
            {
                NotificarErro("Os Ids informados não são iguais!");
                return CustomResponse();
            }

            var consultaEncontrada = await _consultaService.BuscaId(id);

            if (consultaEncontrada == null)
            {
                NotificarErro("Consulta não encontrada!");
                return CustomResponse();
            }

            await _consultaService.Atualizar(_mapper.Map<Consulta>(consulta));
            return Ok(consulta);
        }

        // PUT: api/Consulta/5
        [HttpPut("{id}/sintomas")]
        public async Task<IActionResult> PutConsultaSintoma(int id, ConsultaEdicaoViewModel consulta)
        {
            if (consulta.Id != id) BadRequest("Os Ids informados não são iguais!");

            var consultaEncontrada = await _consultaService.BuscaId(id);

            if (consultaEncontrada == null)
            {
                NotificarErro("Consulta não encontrada!");
                return CustomResponse();
            }

            await _consultaService.AtualizarSintoma(_mapper.Map<Consulta>(consulta));
            return CustomResponse(consulta);
        }

        // POST: api/Consulta
        [HttpPost]
        public async Task<IActionResult> PostConsulta(ConsultaCriacaoViewModel consultaViewModel)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            await _consultaService.Adicionar(_mapper.Map<Consulta>(consultaViewModel));

            return CustomResponse();
        }

        // DELETE: api/Consulta/5
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConsulta(int id)
        {
            var consulta = await _consultaService.BuscaId(id);

            if (consulta == null)
            {
                NotificarErro("Consulta não encontrada!");
                return CustomResponse();
            }

            await _consultaService.Remover(consulta);
            return CustomResponse();
        }
    }
}
