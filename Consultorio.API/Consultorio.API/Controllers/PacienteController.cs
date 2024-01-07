using Microsoft.AspNetCore.Mvc;
using Consultorio.API.Model;
using AutoMapper;
using Consultorio.API.Interfaces;
using Consultorio.API.ViewModel.Paciente;
using Microsoft.AspNetCore.Authorization;
using Consultorio.API.Extensions;

namespace Consultorio.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PacienteController : MainController
    {
        private readonly IPacienteService _pacienteService;
        private readonly IMapper _mapper;

        public PacienteController(IPacienteService pacienteService, IMapper mapper, INotificador notificador) : base(notificador)
        {
            _pacienteService = pacienteService;
            _mapper = mapper;
        }

        // GET: api/Paciente
        [ClaimsAuthorize("Paciente", "Listar")]
        [HttpGet]
        public async Task<IActionResult> GetPacientes()
        {
            var pacientes = _mapper.Map<List<PacienteViewModel>>(await _pacienteService.BuscarTodos());

            if (pacientes == null)
            {
                return NotFound();
            }

            return CustomResponse(pacientes);
        }

        // GET: api/Paciente/5
        [ClaimsAuthorize("Paciente", "Listar")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Paciente>> GetPaciente(int id)
        {
            var paciente = _mapper.Map<PacienteViewModel>(await _pacienteService.BuscaId(id));

            if (paciente == null)
            {
                return NotFound();
            }

            return CustomResponse(paciente);
        }

        // POST: api/Paciente
        [ClaimsAuthorize("Paciente", "Adicionar")]
        [HttpPost]
        public async Task<IActionResult> Adicionar(PacienteCriacaoViewModel pacienteViewModel)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            await _pacienteService.Adicionar(_mapper.Map<Paciente>(pacienteViewModel));

            return CustomResponse(pacienteViewModel);
        }

        // PUT: api/Paciente/5
        [ClaimsAuthorize("Paciente", "Editar")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPaciente(int id, PacienteEdicaoViewModel pacienteViewModel)
        {
            if (pacienteViewModel.Id != id)
            {
                NotificarErro("Os ids informados não são iguais!");
                return CustomResponse();
            }

            if (!ModelState.IsValid) return CustomResponse(ModelState);

            await _pacienteService.Atualizar(_mapper.Map<Paciente>(pacienteViewModel));

            return CustomResponse(pacienteViewModel);

        }

        // DELETE: api/Paciente/5
        [ClaimsAuthorize("Paciente", "Excluir")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaciente(int id)
        {
            var paciente = await _pacienteService.BuscaId(id);

            if (paciente == null) return NotFound();

            await _pacienteService.Remover(paciente);
                
            return CustomResponse(paciente);

        }
    }
}
