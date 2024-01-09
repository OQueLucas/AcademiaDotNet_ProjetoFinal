using AutoMapper;
using Consultorio.API.Interfaces;
using Consultorio.API.Model;
using Consultorio.API.ViewModel.Medico;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Consultorio.API.Controllers
{
    [Authorize(Roles = "Medico, Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class MedicoController : MainController
    {
        private readonly IMedicoService _medicoService;
        private readonly IMapper _mapper;

        public MedicoController(IMedicoService medicoService, IMapper mapper, INotificador notificador) : base(notificador)
        {
            _medicoService = medicoService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetMedicos()
        {
            try
            {
                var medico = _mapper.Map<List<MedicoViewModel>>(await _medicoService.BuscarTodos());

                if (medico == null)
                {
                    return NotFound();
                }

                return Ok(medico);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostMedico(MedicoCriacaoViewModel medicoViewModel)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                await _medicoService.Adicionar(_mapper.Map<Medico>(medicoViewModel));
                return Ok(medicoViewModel);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }

        [HttpGet("{crm}")]
        public async Task<IActionResult> GetMedicoByCRM([FromRoute] string crm)
        {
            try
            {
                var result = _mapper.Map<MedicoViewModel>(await _medicoService.BuscaCRM(crm));
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetMedicoById([FromRoute] int id)
        {
            try
            {
                var result = _mapper.Map<MedicoViewModel>(await _medicoService.BuscaId(id));
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> PutMedico(int id, MedicoEdicaoViewModel medicoViewModel)
        {
            if (medicoViewModel.Id != id) BadRequest("Os Ids informados não são iguais!");
             
            var medico = await _medicoService.BuscaId(id);
            if (medico == null) return NotFound("Medico não encontrado");
            try
            {
                await _medicoService.Atualizar(_mapper.Map<Medico>(medicoViewModel));
                return Ok(medicoViewModel);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedico(int id)
        {
            var medico = await _medicoService.BuscaId(id);

            if (medico == null) return NotFound();

            await _medicoService.Remover(medico);

            return CustomResponse(medico);
        }
    }
}
