import { Component } from '@angular/core';
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

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.scss',
})
export class ConsultasComponent {
  public GeneroToLabelMapping = GeneroToLabelMapping;
  public TipoConsultaToLabelMapping = TipoConsulta;

  consulta$: Observable<Consulta[]> | null = null;
  displayedColumns = [
    'tipoConsulta',
    'data',
    'medicoNome',
    'medicoCRM',
    'especializacao',
    'nome',
    'nomeSocial',
    'genero',
    'actions',
  ];

  constructor(
    private ConsultaService: ConsultaService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  refresh() {
    this.consulta$ = this.ConsultaService.get().pipe(
      catchError(() => {
        this.onError('Erro ao carregar Consultas.');
        return scheduled(of([]), asyncScheduler);
      })
    );
  }

  ngOnInit(): void {}

  onAdd() {
    this.router.navigate(['novo'], { relativeTo: this.route });
  }

  onEdit(consulta: Consulta) {
    this.router.navigate(['editar', consulta.id], { relativeTo: this.route });
  }

  onError(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage,
    });
  }

  onRemove(consulta: Consulta) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover essa consulta?',
    });

    dialogRef.afterClosed().subscribe((result: Boolean) => {
      if (result) {
        this.ConsultaService.delete(consulta.id).subscribe({
          next: () => {
            this.refresh();
            this.onSuccess();
          },
          error: (error) => {
            this.onError('Erro ao tentar remover consulta.');
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
