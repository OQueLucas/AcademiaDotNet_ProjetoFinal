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
            return await _data.Include(medico => medico.Pessoa).ToListAsync();
        }

        public async Task<Medico> GetByCRM(string crm)
        {
            return await _data.Include(medico => medico.Pessoa).AsNoTrackingWithIdentityResolution().FirstOrDefaultAsync(medico => medico.CRM == crm);
        }
    }
}
