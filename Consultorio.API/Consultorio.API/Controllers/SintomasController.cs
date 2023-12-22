using Microsoft.AspNetCore.Mvc;
using Consultorio.API.Model;
using Consultorio.API.Interfaces;

namespace Consultorio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SintomasController : ControllerBase
    {
        private readonly ISintomaService _sintomaService;

        public SintomasController(ISintomaService sintomaService)
        {
            _sintomaService = sintomaService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sintoma>>> GetSintomas()
        {
            try
            {
                var sintoma = await _sintomaService.BuscarTodos();

                if (sintoma == null)
                {
                    return NotFound();
                }

                return Ok(sintoma);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Sintoma>> GetSintoma(int id)
        {
            try
            {
                var result = await _sintomaService.BuscaId(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSintoma(int id, Sintoma sintoma)
        {
            if (sintoma.Id != id) BadRequest("Os Ids informados não são iguais!");

            var sintomaEncontrado = await _sintomaService.BuscaId(id);
            if (sintomaEncontrado == null) return NotFound("Sintoma não encontrado");
            try
            {
                await _sintomaService.Atualizar(sintoma);
                return Ok(sintoma);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Sintoma>> PostSintoma(Sintoma sintoma)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                await _sintomaService.Adicionar(sintoma);
                return Ok(sintoma);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSintoma(int id)
        {
            var sintomaEncontrado = await _sintomaService.BuscaId(id);

            if (sintomaEncontrado == null) return NotFound();

            if (await _sintomaService.Remover(sintomaEncontrado)) return Ok("Sintoma apagado");

            return NoContent();
        }
    }
}
