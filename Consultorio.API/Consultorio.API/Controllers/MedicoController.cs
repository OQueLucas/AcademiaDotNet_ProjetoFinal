using AutoMapper;
using Consultorio.API.Interfaces;
using Consultorio.API.Model;
using Consultorio.API.Repository;
using Consultorio.API.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Consultorio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicoController : ControllerBase
    {
        private readonly IMedicoRepository _repo;
        private readonly IMedicoService _medicoService;
        private readonly IMapper _mapper;

        public MedicoController(IMedicoRepository repository, IMedicoService medicoService, IMapper mapper)
        {
            _repo = repository;
            _medicoService = medicoService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var medico = _mapper.Map<List<MedicoViewModel>>(await _repo.GetAll());
                return Ok(medico);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(MedicoViewModel medicoViewModel)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            await _repo.Add(_mapper.Map<Medico>(medicoViewModel));

                return Ok(medicoViewModel);

            return BadRequest();
        }

        [HttpGet("{crm}")]
        public async Task<IActionResult> GetByCRM(string crm)
        {
            try
            {
                var result = _mapper.Map<MedicoViewModel>(await _repo.FindByCRM(crm));
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }
    }
}
