import { AfterViewInit, Component } from '@angular/core';
import { Paciente } from '../models/Paciente';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneroToLabelMapping } from '../../../enum/Genero.enum';
import { TipoSanguineoToLabelMapping } from '../../../enum/TipoSanguineo.enum';

@Component({
  selector: 'app-paciente-detalhes',
  templateUrl: './paciente-detalhes.component.html',
  styleUrl: './paciente-detalhes.component.scss',
})
export class PacienteDetalhesComponent implements AfterViewInit {
  paciente: Paciente;

  public GeneroToLabelMapping = GeneroToLabelMapping;
  public TipoSanguineoToLabelMapping = TipoSanguineoToLabelMapping;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.paciente = this.route.snapshot.data['paciente'];
  }
  ngAfterViewInit(): void {
    console.log(this.paciente);
  }

  onEdit(paciente: Paciente) {
    this.router.navigate(['pacientes/editar', paciente.id]);
  }

  voltar() {
    this.router.navigate(['pacientes']);
  }
}
