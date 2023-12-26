using Consultorio.API.Data;
using Consultorio.API.Interfaces;
using Consultorio.API.Model;
using Microsoft.EntityFrameworkCore;

namespace Consultorio.API.Repository
{
    public class ConsultaRepository : BaseRepository<Consulta>, IConsultaRepository
    {
        private readonly Context _context;
        private readonly DbSet<Consulta> _data;
        public ConsultaRepository(Context context) : base(context)
        {
            _context = context;
            _data = _context.Set<Consulta>();
        }

        public override async Task<List<Consulta>> GetAll()
        {
            return await _data.Include(consulta => consulta.Paciente.Pessoa).Include(consulta => consulta.Medico.Pessoa)
                .Include(consulta => consulta.Sintomas)
                    .ThenInclude(sintomaConsulta => sintomaConsulta.Sintoma).ToListAsync();
        }

        public async Task<Consulta> GetById(int id)
        {
            return await _data.AsNoTrackingWithIdentityResolution()
                .Include(consulta => consulta.Paciente.Pessoa)
                .Include(consulta => consulta.Medico.Pessoa)
                .Include(consulta => consulta.Sintomas)
                    .ThenInclude(sintomaConsulta => sintomaConsulta.Sintoma)
                .FirstOrDefaultAsync(consulta => consulta.Id == id);
        }
    }
}