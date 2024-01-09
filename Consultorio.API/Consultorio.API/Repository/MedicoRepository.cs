using Consultorio.API.Data;
using Consultorio.API.Interfaces;
using Consultorio.API.Model;
using Microsoft.EntityFrameworkCore;

namespace Consultorio.API.Repository
{
    public class MedicoRepository : BaseRepository<Medico>, IMedicoRepository
    {
        private readonly Context _context;
        private readonly DbSet<Medico> _data;
        public MedicoRepository(Context context) : base(context)
        {
            _context = context;
            _data = _context.Set<Medico>();
        }

        public async Task<Medico> GetById(int id)
        {
            return await _data.Include(medico => medico.Pessoa).AsNoTrackingWithIdentityResolution().FirstOrDefaultAsync(medico => medico.Id == id);
        }

        public override async Task<List<Medico>> GetAll()
        {
            return await _data.Include(medico => medico.Pessoa).OrderBy(medico => medico.Pessoa.Nome).ToListAsync();
        }

        public async Task<Medico> GetByCRM(string crm)
        {
            return await _data.Include(medico => medico.Pessoa).AsNoTrackingWithIdentityResolution().FirstOrDefaultAsync(medico => medico.CRM == crm);
        }

        public async Task<Medico> ObterMedicoConsultas(int id)
        {
            return await _data.Include(medico => medico.Pessoa).Include(medico => medico.Consultas).ThenInclude(consulta => consulta.Paciente).ThenInclude(paciente => paciente.Pessoa).AsNoTrackingWithIdentityResolution().FirstOrDefaultAsync(medico => medico.Id == id);
        }
    }
}
