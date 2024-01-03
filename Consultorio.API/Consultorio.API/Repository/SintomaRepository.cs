using Consultorio.API.Data;
using Consultorio.API.Interfaces;
using Consultorio.API.Model;
using Microsoft.EntityFrameworkCore;

namespace Consultorio.API.Repository
{
    public class SintomaRepository : BaseRepository<Sintoma>, ISintomaRepository
    {
        private readonly Context _context;
        private readonly DbSet<Sintoma> _data;
        public SintomaRepository(Context context) : base(context)
        {
            _context = context;
            _data = _context.Set<Sintoma>();
        }

        public async Task<Sintoma> GetById(int id)
        {
            return await _data.AsNoTracking().OrderBy(sintoma => sintoma.Nome).FirstOrDefaultAsync(sintoma => sintoma.Id == id);
        }
    }
}