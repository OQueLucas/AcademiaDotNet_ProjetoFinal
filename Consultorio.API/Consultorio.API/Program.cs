using Consultorio.API.Configuration;
using Consultorio.API.Data;
using Consultorio.API.Interfaces;
using Consultorio.API.Notificacoes;
using Consultorio.API.Repository;
using Consultorio.API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Consultorio.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins, policy =>
                {
                    policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                });
            });

            // Add services to the container.
            builder.Services.AddControllers()
                            .AddNewtonsoftJson(opt => opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<Context>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Consultorio")));

            builder.Services.AddIdentityConfiguration(builder.Configuration);

            builder.Services.AddScoped<Context>();
            builder.Services.AddScoped<IMedicoRepository, MedicoRepository>();
            builder.Services.AddScoped<IPacienteRepository, PacienteRepository>();
            builder.Services.AddScoped<ISintomaRepository, SintomaRepository>();
            builder.Services.AddScoped<IConsultaRepository, ConsultaRepository>();

            builder.Services.AddScoped<INotificador, Notificador>();
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<IMedicoService, MedicoService>();
            builder.Services.AddScoped<IPacienteService, PacienteService>();
            builder.Services.AddScoped<ISintomaService, SintomaService>();
            builder.Services.AddScoped<IConsultaService, ConsultaService>();

            builder.Services.AddAutoMapper(typeof(Program));

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors(builder => {
                builder.AllowAnyOrigin();
                builder.AllowAnyMethod();
                builder.AllowAnyHeader();
            });

            app.UseHttpsRedirection();

            app.UseAuthentication();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
