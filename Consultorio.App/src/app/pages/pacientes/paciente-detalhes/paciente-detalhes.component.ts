import { Component } from '@angular/core';
import { Paciente } from '../models/Paciente';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneroToLabelMapping } from '../../../enum/Genero.enum';
import { TipoSanguineoToLabelMapping } from '../../../enum/TipoSanguineo.enum';
import { icon } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-paciente-detalhes',
  templateUrl: './paciente-detalhes.component.html',
  styleUrl: './paciente-detalhes.component.scss',
})
export class PacienteDetalhesComponent {
  public editarIcon = icon({ prefix: 'fas', iconName: 'pen-to-square' });
  public voltarIcon = icon({ prefix: 'fas', iconName: 'arrow-left' });

  public paciente: Paciente;
  public nenhumaConsulta;

  public GeneroToLabelMapping = GeneroToLabelMapping;
  public TipoSanguineoToLabelMapping = TipoSanguineoToLabelMapping;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.paciente = this.route.snapshot.data['paciente'];
    this.nenhumaConsulta = this.paciente.consultas.length == 0;
  }

  public onEdit(paciente: Paciente) {
    this.router.navigate(['pacientes/editar', paciente.id]);
  }

  public voltar() {
    this.router.navigate(['pacientes']);
  }
}
