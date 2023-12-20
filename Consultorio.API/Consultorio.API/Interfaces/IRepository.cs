using System.Linq.Expressions;

namespace Consultorio.API.Interfaces
{
    public interface IRepository<T>
    {
        public Task<List<T>> GetAll();
        public Task<T> FindById(int id);
        public Task Add(T entity);
        public Task Update(T entity);
        Task<IEnumerable<T>> GetBy(Expression<Func<T, bool>> predicate);
        public Task<bool> Remove(T entity);
        Task<bool> SaveChangesAsync();
    }
}
