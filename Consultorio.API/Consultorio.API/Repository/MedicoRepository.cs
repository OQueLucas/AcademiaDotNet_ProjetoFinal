using Consultorio.API.Data;
using Consultorio.API.Model;
using Consultorio.API.ViewModel;
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

        public virtual async Task<List<Medico>> GetAll()
        {
            return await _data.Include(medico => medico.Pessoa).ToListAsync();
        }

        public virtual async Task<Medico> FindById(int id)
        {
            return await _data.FindAsync(id);
        }

        public virtual async Task<Medico> FindByCRM(string crm)
        {
            return await _data.Include(medico => medico.Pessoa).FirstOrDefaultAsync(medico => medico.CRM == crm);
        }

        //public override async Task Add(Medico medico)
        //{
        //    await _context.AddAsync(medico);
        //    await _context.SaveChangesAsync();
        //}
    }
}
