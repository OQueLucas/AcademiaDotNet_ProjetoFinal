using System.ComponentModel;

namespace Consultorio.API.Model.Enum
{
    public enum Genero
    {
        Outro = 0,
        [Description("Masculino Cis")]
        Masculino_Cis = 1,
        [Description("Masculino Trans")]
        Masculino_Trans = 2,
        [Description("Feminino Cis")]
        Feminino_Cis = 3,
        [Description("Feminino Trans")]
        Feminino_Trans = 4,
    }
}
