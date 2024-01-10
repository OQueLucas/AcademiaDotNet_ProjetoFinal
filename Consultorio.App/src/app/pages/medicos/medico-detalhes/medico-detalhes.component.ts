import { Component } from '@angular/core';
import { Medico } from '../model/medico';
import { GeneroToLabelMapping } from '../../../enum/Genero.enum';
import { TipoSanguineoToLabelMapping } from '../../../enum/TipoSanguineo.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { icon } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-medico-detalhes',
  templateUrl: './medico-detalhes.component.html',
  styleUrl: './medico-detalhes.component.scss',
})
export class MedicoDetalhesComponent {
  public editarIcon = icon({ prefix: 'fas', iconName: 'pen-to-square' });
  public voltarIcon = icon({ prefix: 'fas', iconName: 'arrow-left' });

  public medico: Medico;

  public GeneroToLabelMapping = GeneroToLabelMapping;
  public TipoSanguineoToLabelMapping = TipoSanguineoToLabelMapping;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.medico = this.route.snapshot.data['medico'];
  }

  public onEdit(medico: Medico) {
    this.router.navigate(['medicos/editar', medico.id]);
  }

  public voltar() {
    this.router.navigate(['medicos']);
  }
}
