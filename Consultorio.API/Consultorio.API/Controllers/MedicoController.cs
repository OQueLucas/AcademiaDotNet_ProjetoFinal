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
            var medico = _mapper.Map<List<MedicoViewModel>>(await _medicoService.BuscarTodos());

            if (medico == null)
            {
                NotificarErro("Nenhum medico foi encontrado!");
            }

            return CustomResponse(medico);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetMedicoById([FromRoute] int id)
        {
            var result = _mapper.Map<MedicoViewModel>(await _medicoService.BuscaId(id));

            if (result == null)
            {
                NotificarErro("Medico não encontrado!");
            }

            return CustomResponse(result);
        }

        [HttpGet("{crm}")]
        public async Task<IActionResult> GetMedicoByCRM([FromRoute] string crm)
        {
            var result = _mapper.Map<MedicoViewModel>(await _medicoService.BuscaCRM(crm));

            if (result == null)
            {
                NotificarErro("Medico não encontrado!");
            }

            return CustomResponse(result);
        }

        [HttpPost]
        public async Task<IActionResult> PostMedico(MedicoCriacaoViewModel medicoViewModel)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            await _medicoService.Adicionar(_mapper.Map<Medico>(medicoViewModel));
            return CustomResponse(medicoViewModel);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> PutMedico(int id, MedicoEdicaoViewModel medicoViewModel)
        {
            if (medicoViewModel.Id != id)
            {
                NotificarErro("Os Ids informados não são iguais!");
                return CustomResponse();
            }

            var medico = await _medicoService.BuscaId(id);

            if (medico == null)
            {
                NotificarErro("Medico não encontrado!");
                return CustomResponse();
            }

            await _medicoService.Atualizar(_mapper.Map<Medico>(medicoViewModel));
            return CustomResponse(medicoViewModel);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedico(int id)
        {
            var medico = await _medicoService.BuscaId(id);

            if (medico == null)
            {
                NotificarErro("Medico não encontrado!");
                return CustomResponse();
            }

            await _medicoService.Remover(medico);
            return CustomResponse(medico);
        }
    }
}
