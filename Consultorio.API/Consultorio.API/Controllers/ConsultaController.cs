using Microsoft.AspNetCore.Mvc;
using Consultorio.API.Model;
using AutoMapper;
using Consultorio.API.Interfaces;
using Consultorio.API.ViewModel.Consulta;

namespace Consultorio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultaController : ControllerBase
    {
        private readonly IConsultaService _consultaService;
        private readonly IMapper _mapper;

        public ConsultaController(IConsultaService consultaService, IMapper mapper)
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
                return NotFound();
            }

            return Ok(consulta);
        }

        // GET: api/Consulta/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Consulta>> GetConsulta(int id)
        {
            if (_consultaService == null)
            {
                return NotFound();
            }

            var consulta = _mapper.Map<ConsultaViewModel>(await _consultaService.BuscaId(id));

            if (consulta == null)
            {
                return NotFound();
            }

            return Ok(consulta);
        }

        // PUT: api/Consulta/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutConsulta(int id, ConsultaEdicaoViewModel consulta)
        {
            if (consulta.Id != id) BadRequest("Os Ids informados não são iguais!");

            var consultaEncontrada = await _consultaService.BuscaId(id);
            if (consultaEncontrada == null) return NotFound("Consulta não encontrado");
            try
            {
                await _consultaService.Atualizar(_mapper.Map<Consulta>(consulta));
                return Ok(consulta);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }

        // POST: api/Consulta
        [HttpPost]
        public async Task<IActionResult> PostConsulta(ConsultaCriacaoViewModel consultaViewModel)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                await _consultaService.Adicionar(_mapper.Map<Consulta>(consultaViewModel));
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }

            return Ok();
        }

        // DELETE: api/Consulta/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConsulta(int id)
        {
            var consulta = await _consultaService.BuscaId(id);

            if (consulta == null) return NotFound();

            if (await _consultaService.Remover(consulta)) return Ok("Consulta apagado");

            return NoContent();
        }
    }
}
