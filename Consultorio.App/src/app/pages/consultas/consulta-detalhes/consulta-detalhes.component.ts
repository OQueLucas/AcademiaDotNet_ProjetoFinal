import { Component } from '@angular/core';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { Consulta } from '../model/consulta';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneroToLabelMapping } from '../../../enum/Genero.enum';
import { TipoSanguineoToLabelMapping } from '../../../enum/TipoSanguineo.enum';
import { TipoConsultaToLabelMapping } from '../../../enum/TipoConsulta.enum';

@Component({
  selector: 'app-consulta-detalhes',
  templateUrl: './consulta-detalhes.component.html',
  styleUrl: './consulta-detalhes.component.scss',
})
export class ConsultaDetalhesComponent {
  public editarIcon = icon({ prefix: 'fas', iconName: 'pen-to-square' });
  public voltarIcon = icon({ prefix: 'fas', iconName: 'arrow-left' });

  public consulta: Consulta;
  public nenhumSintoma;

  public GeneroToLabelMapping = GeneroToLabelMapping;
  public TipoSanguineoToLabelMapping = TipoSanguineoToLabelMapping;
  public TipoConsultaToLabelMapping = TipoConsultaToLabelMapping;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.consulta = this.route.snapshot.data['consulta'];
    this.nenhumSintoma = this.consulta.sintomas.length == 0;
  }

  public onEdit(consulta: Consulta) {
    this.router.navigate(['consultas/editar', consulta.id]);
  }

  public voltar() {
    this.router.navigate(['consultas']);
  }
}
