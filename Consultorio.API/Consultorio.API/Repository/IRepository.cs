namespace Consultorio.API.Repository
{
    public interface IRepository<T>
    {
        public Task<List<T>> GetAll();
        public Task<T> FindById(int id);
        public Task Add(T entity);
        public Task Update(T entity);
        public Task Remove(T entity);
        Task<bool> SaveChangesAsync();
    }
}
