import { Component } from '@angular/core';
import { asyncScheduler, of, scheduled } from 'rxjs';
import { GeneroToLabelMapping } from '../../../enum/Genero.enum';
import { ConsultaService } from '../../../services/consulta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { TipoConsulta } from '../../../enum/TipoConsulta.enum';
import { Consulta } from '../model/consulta';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.scss',
})
export class ConsultasComponent {
  public detalheIcon = icon({ prefix: 'fas', iconName: 'list' });
  public editarIcon = icon({ prefix: 'fas', iconName: 'pen-to-square' });
  public excluirIcon = icon({ prefix: 'fas', iconName: 'trash-can' });
  public novoIcon = icon({ prefix: 'fas', iconName: 'plus' });

  public alerts: any[] = [];
  public type: string;
  public consultas: Consulta[] = null;
  public nenhumaConsulta: boolean = false;

  public GeneroToLabelMapping = GeneroToLabelMapping;
  public TipoConsultaToLabelMapping = TipoConsulta;

  public iterador = 0;
  public linha = new Array(15);
  public coluna = new Array(8);

  constructor(
    private ConsultaService: ConsultaService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.refresh();
  }

  public onAdd() {
    this.router.navigate(['novo'], { relativeTo: this.route });
  }

  public onEdit(id: number) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  public onDetail(id: number) {
    this.router.navigate(['detalhes', id], { relativeTo: this.route });
  }

  public onRemove(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover essa consulta?',
    });

    dialogRef.afterClosed().subscribe((result: Boolean) => {
      if (result) {
        this.ConsultaService.delete(id).subscribe({
          next: () => {
            this.refresh();
            this.toastr.success('Consulta removida com sucesso!', 'Sucesso!');
          },
          error: (error) => {
            this.alerts = error.error.errors;
            this.type = 'danger';
            this.toastr.error(
              'Ocorreu algum erro ao remover consulta!',
              'Falha!',
              {
                progressBar: true,
              }
            );
          },
        });
      }
    });
  }

  private refresh() {
    this.ConsultaService.get().subscribe({
      next: (response) => {
        this.consultas = response;
        this.nenhumaConsulta = true;
      },
      error: (error) => {
        this.alerts = error.error.errors;
        this.type = 'danger';
        this.toastr.error(
          'Ocorreu algum erro ao carregar as consulta!',
          'Falha!'
        );
        this.nenhumaConsulta = true;
      },
    });
  }
}
