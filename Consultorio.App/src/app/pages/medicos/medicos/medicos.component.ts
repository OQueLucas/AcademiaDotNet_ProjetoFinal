import { Component } from '@angular/core';
import { Observable, asyncScheduler, catchError, of, scheduled } from 'rxjs';
import { MedicoService } from '../../../services/medico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { TipoSanguineoToLabelMapping } from '../../../enum/TipoSanguineo.enum';
import { GeneroToLabelMapping } from '../../../enum/Genero.enum';
import { Medico } from '../model/medico';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrl: './medicos.component.scss',
})
export class MedicosComponent {
  public GeneroToLabelMapping = GeneroToLabelMapping;
  public TipoSanguineoToLabelMapping = TipoSanguineoToLabelMapping;

  medicos$: Observable<Medico[]> | null = null;
  displayedColumns = ['nome', 'nomeSocial', 'crm', 'especializacao', 'actions'];

  constructor(
    private MedicoService: MedicoService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  refresh() {
    this.medicos$ = this.MedicoService.get().pipe(
      catchError(() => {
        this.onError('Erro ao carregar Medicos.');
        return scheduled(of([]), asyncScheduler);
      })
    );
  }

  ngOnInit(): void {}

  onAdd() {
    this.router.navigate(['novo'], { relativeTo: this.route });
  }

  onEdit(medico: Medico) {
    this.router.navigate(['editar', medico.id], { relativeTo: this.route });
  }

  onError(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage,
    });
  }

  onDetail(medico: Medico) {
    this.router.navigate(['detalhes', medico.id], { relativeTo: this.route });
  }

  onRemove(medico: Medico) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse medico?',
    });

    dialogRef.afterClosed().subscribe((result: Boolean) => {
      if (result) {
        this.MedicoService.delete(medico.id).subscribe({
          next: () => {
            this.refresh();
            this.onSuccess();
          },
          error: (error) => {
            this.onError('Erro ao tentar remover medico.');
          },
        });
      }
    });
  }

  private onSuccess() {
    this._snackBar.open('Medico removido com sucesso!', 'X', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
