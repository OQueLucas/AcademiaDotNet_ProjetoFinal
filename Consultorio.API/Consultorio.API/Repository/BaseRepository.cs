using Consultorio.API.Data;
using Consultorio.API.Interfaces;
using Consultorio.API.Model;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Consultorio.API.Repository
{
    public class BaseRepository<T> : IRepository<T> where T : Entity
    {
        private readonly Context _context;
        protected readonly DbSet<T> _data;

        public BaseRepository(Context context)
        {
            _context = context;
            _data = context.Set<T>();
        }

        public virtual async Task<List<T>> GetAll()
        {
            return await _data.ToListAsync();
        }

        public virtual async Task<T> FindById(int id)
        {
            return await _data.FindAsync(id);
        }

        public async Task<IEnumerable<T>> GetBy(Expression<Func<T, bool>> predicate)
        {
            return await _data.AsNoTracking().Where(predicate).ToListAsync();
        }

        public virtual async Task Add(T entity)
        {
            try
            {
                _data.Add(entity);
                await SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public virtual async Task Update(T entity)
        {
            _data.Update(entity);
            await SaveChangesAsync();
        }

        public virtual async Task<bool> Remove(T entity)
        {
            _context.Remove(entity);
            return await SaveChangesAsync();
        }

        public virtual async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
    }
}
