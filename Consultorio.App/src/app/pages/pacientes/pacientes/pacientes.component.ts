import { Component } from '@angular/core';
import { Paciente } from '../models/Paciente';
import { asyncScheduler, catchError, of, scheduled } from 'rxjs';
import { PacienteService } from '../../../services/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { TipoSanguineoToLabelMapping } from '../../../enum/TipoSanguineo.enum';
import { GeneroToLabelMapping } from '../../../enum/Genero.enum';
import { UtilsService } from '../../../services/utils.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { icon } from '@fortawesome/fontawesome-svg-core';
@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.scss',
})
export class PacientesComponent {
  detalheIcon = icon({ prefix: 'fas', iconName: 'list' });
  editarIcon = icon({ prefix: 'fas', iconName: 'pen-to-square' });
  excluirIcon = icon({ prefix: 'fas', iconName: 'trash-can' });
  novoIcon = icon({ prefix: 'fas', iconName: 'plus' });

  pacientes: Paciente[] = [];

  public GeneroToLabelMapping = GeneroToLabelMapping;
  public TipoSanguineoToLabelMapping = TipoSanguineoToLabelMapping;

  alerts: any[] = [];
  type: string;

  constructor(
    private PacienteService: PacienteService,
    private router: Router,
    private route: ActivatedRoute,
    public utils: UtilsService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.refresh();
  }

  refresh() {
    this.spinner.show();
    this.PacienteService.get().subscribe({
      next: (pacientes) => {
        this.pacientes = pacientes;
      },
      error: () => {
        catchError((error) => {
          this.onError('Erro ao carregar Pacientes.');
          this.alerts = error.error.errors;
          this.type = 'danger';
          return scheduled(of([]), asyncScheduler);
        });
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  }

  onAdd() {
    this.router.navigate(['novo'], { relativeTo: this.route });
  }

  onEdit(paciente: Paciente) {
    this.router.navigate(['editar', paciente.id], { relativeTo: this.route });
  }

  onDetail(paciente: Paciente) {
    this.router.navigate(['detalhes', paciente.id], { relativeTo: this.route });
  }

  onError(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage,
    });
  }

  onRemove(pacienteId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse paciente?',
    });

    dialogRef.afterClosed().subscribe((result: Boolean) => {
      if (result) {
        this.PacienteService.delete(pacienteId).subscribe({
          next: () => {
            this.refresh();
            this.toastr.success('Paciente removido com sucesso!', 'Sucesso!', {
              progressBar: true,
            });
          },
          error: (error) => {
            this.alerts = error.error.errors;
            this.type = 'danger';
            this.toastr.error(
              'Ocorreu algum erro ao remover paciente!',
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

  private processarFalha(fail: any) {
    this.alerts = fail.error.errors;
  }
}
