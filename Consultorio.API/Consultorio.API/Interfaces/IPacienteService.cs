using Consultorio.API.Model;

namespace Consultorio.API.Interfaces
{
    public interface IPacienteService
    {
        Task<ICollection<Paciente>> BuscarTodos();
        Task<bool> Adicionar(Paciente paciente);
        Task<Paciente> BuscaId(int id);
        Task<bool> Atualizar(Paciente paciente);
        Task<bool> Remover(Paciente paciente);
    }
}
