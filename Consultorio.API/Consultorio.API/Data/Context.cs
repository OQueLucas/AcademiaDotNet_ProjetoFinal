using Castle.Core.Resource;
using Consultorio.API.Model;
using Consultorio.API.Model.Enum;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;

namespace Consultorio.API.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {
        }

        public DbSet<Pessoa> Pessoa { get; set; }
        public DbSet<Medico> Medico { get; set; }
        public DbSet<Paciente> Paciente { get; set; }
        public DbSet<Sintoma> Sintoma { get; set; }
        public DbSet<Consulta> Consulta { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Pessoa>()
                .HasIndex(pessoa => pessoa.CPF)
                .IsUnique();

            modelBuilder.Entity<Medico>()
                .HasOne(medico => medico.Pessoa);

            modelBuilder.Entity<Medico>()
                .HasKey(medico => medico.Id);

            modelBuilder.Entity<Medico>()
                .HasIndex(medico => medico.CRM)
                .IsUnique();

            modelBuilder.Entity<Paciente>()
                .HasOne(paciente => paciente.Pessoa);

            modelBuilder.Entity<Sintoma>()
                .HasIndex(sintoma => sintoma.Nome)
                .IsUnique();

            var converter = new ValueConverter<TipoConsulta, string>(
                value => value.ToString(),
                value => (TipoConsulta)Enum.Parse(typeof(TipoConsulta), value));

            modelBuilder.Entity<Consulta>()
                .Property(consulta => consulta.TipoConsulta)
                .HasConversion(converter);

            modelBuilder.Entity<Consulta>()
                .HasOne(consulta => consulta.Paciente)
                .WithMany(paciente => paciente.Consultas)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Consulta>()
                .HasOne(consulta => consulta.Medico)
                .WithMany(medico => medico.Consultas)
                .HasForeignKey(consulta => consulta.MedicoCRM)
                .HasPrincipalKey(medico => medico.CRM)
                .OnDelete(DeleteBehavior.Restrict);

        }
    }
}
