
using Consultorio.API.Data;
using Consultorio.API.Interfaces;
using Consultorio.API.Model;
using Microsoft.EntityFrameworkCore;

namespace Consultorio.API.Repository
{
    public class PacienteRepository : BaseRepository<Paciente>, IPacienteRepository
    {
        private readonly Context _context;
        private readonly DbSet<Paciente> _data;
        public PacienteRepository(Context context) : base(context)
        {
            _context = context;
            _data = _context.Set<Paciente>();
        }

        public override async Task<List<Paciente>> GetAll()
        {
            return await _data.Include(paciente => paciente.Pessoa).ToListAsync();
        }

        public async Task<Paciente> GetById(int id)
        {
            return await _data.Include(paciente => paciente.Pessoa).AsNoTrackingWithIdentityResolution().FirstOrDefaultAsync(paciente => paciente.Id == id);
        }
    }
}