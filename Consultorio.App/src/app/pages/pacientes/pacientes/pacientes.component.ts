import { Component } from '@angular/core';
import { Paciente } from '../models/Paciente';
import { Observable, asyncScheduler, catchError, of, scheduled } from 'rxjs';
import { PacienteService } from '../../../services/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { TipoSanguineoToLabelMapping } from '../../../enum/TipoSanguineo.enum';
import { GeneroToLabelMapping } from '../../../enum/Genero.enum';
@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.scss',
})
export class PacientesComponent {
  public GeneroToLabelMapping = GeneroToLabelMapping;
  public TipoSanguineoToLabelMapping = TipoSanguineoToLabelMapping;

  pacientes$: Observable<Paciente[]> | null = null;
  displayedColumns = [
    'nome',
    'nomeSocial',
    'cpf',
    'email',
    'tipoSanguineo',
    'genero',
    'actions',
  ];

  constructor(
    private PacienteService: PacienteService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  refresh() {
    this.pacientes$ = this.PacienteService.get().pipe(
      catchError(() => {
        this.onError('Erro ao carregar Pacientes.');
        return scheduled(of([]), asyncScheduler);
      })
    );
  }

  ngOnInit(): void {}

  onAdd() {
    this.router.navigate(['novo'], { relativeTo: this.route });
  }

  onEdit(paciente: Paciente) {
    this.router.navigate(['editar', paciente.id], { relativeTo: this.route });
  }

  onError(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage,
    });
  }

  onRemove(paciente: Paciente) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse paciente?',
    });

    dialogRef.afterClosed().subscribe((result: Boolean) => {
      if (result) {
        this.PacienteService.delete(paciente.id).subscribe({
          next: () => {
            this.refresh();
            this.onSuccess();
          },
          error: (error) => {
            this.onError('Erro ao tentar remover paciente.');
          },
        });
      }
    });
  }

  private onSuccess() {
    this._snackBar.open('Paciente removido com sucesso!', 'X', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
