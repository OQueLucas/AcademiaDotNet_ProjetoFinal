using Microsoft.AspNetCore.Mvc;
using Consultorio.API.Model;
using AutoMapper;
using Consultorio.API.Interfaces;
using Consultorio.API.ViewModel.Paciente;

namespace Consultorio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PacienteController : ControllerBase
    {
        private readonly IPacienteService _pacienteService;
        private readonly IMapper _mapper;

        public PacienteController(IPacienteService pacienteService, IMapper mapper)
        {
            _pacienteService = pacienteService;
            _mapper = mapper;
        }

        // GET: api/Paciente
        [HttpGet]
        public async Task<IActionResult> GetPacientes()
        {
            var pacientes = _mapper.Map<List<PacienteViewModel>>(await _pacienteService.BuscarTodos());

            if (pacientes == null)
            {
                return NotFound();
            }

            return Ok(pacientes);
        }

        // GET: api/Paciente/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Paciente>> GetPaciente(int id)
        {
            if (_pacienteService == null)
            {
                return NotFound();
            }

            var paciente = _mapper.Map<PacienteViewModel>(await _pacienteService.BuscaId(id));

            if (paciente == null)
            {
                return NotFound();
            }

            return Ok(paciente);
        }

        // PUT: api/Paciente/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPaciente(int id, PacienteEdicaoViewModel pacienteViewModel)
        {
            if (pacienteViewModel.Id != id) BadRequest("Os Ids informados não são iguais!");

            if (!ModelState.IsValid) return BadRequest(ModelState);

            var paciente = await _pacienteService.BuscaId(id);
            if (paciente == null) return NotFound("Paciente não encontrado");
            try
            {
                await _pacienteService.Atualizar(_mapper.Map<Paciente>(pacienteViewModel));
                return Ok(pacienteViewModel);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }

        // POST: api/Paciente
        [HttpPost]
        public async Task<IActionResult> PostPaciente(PacienteInputViewModel pacienteViewModel)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                await _pacienteService.Adicionar(_mapper.Map<Paciente>(pacienteViewModel));
            }
            catch (Exception ex)
            {
                return BadRequest($"Ocorreu um erro ao cadastrar o Paciente:\n{ex.Message}");
            }

            return Created("", pacienteViewModel);
        }

        // DELETE: api/Paciente/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaciente(int id)
        {
            var paciente = await _pacienteService.BuscaId(id);

            if (paciente == null) return NotFound();

            if (await _pacienteService.Remover(paciente)) return Ok("Paciente apagado");

            return NoContent();
        }
    }
}
