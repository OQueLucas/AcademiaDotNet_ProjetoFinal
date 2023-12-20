using Consultorio.API.Model;

namespace Consultorio.API.Interfaces
{
    public interface IPacienteService
    {
        Task<ICollection<Paciente>> BuscarTodos();
        Task Adicionar(Paciente paciente);
        Task<Paciente> BuscaId(int id);
        Task Atualizar(Paciente paciente);
        Task<bool> Remover(Paciente paciente);
    }
}
