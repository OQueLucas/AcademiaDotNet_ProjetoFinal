using System.ComponentModel.DataAnnotations;

namespace Consultorio.API.Model
{
    public abstract class Entity
    {
        public Entity() {}

        [Key]
        public int Id { get; set; }
    }
}
