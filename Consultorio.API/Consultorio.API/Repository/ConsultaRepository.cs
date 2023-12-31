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

        public override async Task Update(Consulta entity)
        {
            _data.Update(entity);
            await SaveChangesAsync();
        }

        public async Task UpdateSintomas(Consulta entity)
        {
            var all = _context.SintomaConsulta.Where(x => x.ConsultaId == entity.Id).AsNoTracking().ToList();
            List<SintomaConsulta> sintomas = entity.Sintomas.ToList();
            var remove = all.ToList();

            foreach (var sintomaCadastrado in all)
            {
                foreach (var sintoma in sintomas)
                {
                    if (sintomaCadastrado.Id == sintoma.Id)
                    {
                        remove.Remove(sintomaCadastrado);
                        break;
                    }
                }
            }

            _context.SintomaConsulta.RemoveRange(remove);
            await SaveChangesAsync();
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