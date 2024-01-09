import { AfterViewInit, Component } from '@angular/core';
import { Observable, asyncScheduler, catchError, of, scheduled } from 'rxjs';
import { GeneroToLabelMapping } from '../../../enum/Genero.enum';
import { ConsultaService } from '../../../services/consulta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
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
  detalheIcon = icon({ prefix: 'fas', iconName: 'list' });
  editarIcon = icon({ prefix: 'fas', iconName: 'pen-to-square' });
  excluirIcon = icon({ prefix: 'fas', iconName: 'trash-can' });
  novoIcon = icon({ prefix: 'fas', iconName: 'plus' });

  public GeneroToLabelMapping = GeneroToLabelMapping;
  public TipoConsultaToLabelMapping = TipoConsulta;

  alerts: any[] = [];
  type: string;

  consultas: Consulta[] = null;

  constructor(
    private ConsultaService: ConsultaService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private _snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  refresh() {
    this.ConsultaService.get().subscribe({
      next: (response) => {
        this.consultas = response;
      },
      error: (error) => {
        this.alerts = error.error.errors;
        this.type = 'danger';
        this.toastr.error('Ocorreu algum ao carregar as consulta!', 'Falha!', {
          progressBar: true,
        });
        return scheduled(of([]), asyncScheduler);
      },
    });
  }

  ngOnInit(): void {}

  onAdd() {
    this.router.navigate(['novo'], { relativeTo: this.route });
  }

  onEdit(id: number) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  onDetail(id: number) {
    this.router.navigate(['detalhes', id], { relativeTo: this.route });
  }

  onError(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage,
    });
  }

  onRemove(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover essa consulta?',
    });

    dialogRef.afterClosed().subscribe((result: Boolean) => {
      if (result) {
        this.ConsultaService.delete(id).subscribe({
          next: () => {
            this.refresh();
            this.toastr.success('Consulta removida com sucesso!', 'Sucesso!', {
              progressBar: true,
            });
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

  private onSuccess() {
    this._snackBar.open('Consulta removido com sucesso!', 'X', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
