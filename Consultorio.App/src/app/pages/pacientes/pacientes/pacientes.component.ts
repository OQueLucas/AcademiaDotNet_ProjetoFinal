import { Component } from '@angular/core';
import { Paciente } from '../models/Paciente';
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
  public detalheIcon = icon({ prefix: 'fas', iconName: 'list' });
  public editarIcon = icon({ prefix: 'fas', iconName: 'pen-to-square' });
  public excluirIcon = icon({ prefix: 'fas', iconName: 'trash-can' });
  public novoIcon = icon({ prefix: 'fas', iconName: 'plus' });

  public pacientes: Paciente[] = [];
  public nenhumPaciente: boolean = false;

  public GeneroToLabelMapping = GeneroToLabelMapping;
  public TipoSanguineoToLabelMapping = TipoSanguineoToLabelMapping;

  public alerts: any[] = [];
  public type: string;

  public iterador = 0;
  public linha = new Array(15);
  public coluna = new Array(7);

  constructor(
    private PacienteService: PacienteService,
    private router: Router,
    private route: ActivatedRoute,
    public utils: UtilsService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.refresh();
  }

  public onAdd() {
    this.router.navigate(['novo'], { relativeTo: this.route });
  }

  public onEdit(paciente: Paciente) {
    this.router.navigate(['editar', paciente.id], { relativeTo: this.route });
  }

  public onDetail(paciente: Paciente) {
    this.router.navigate(['detalhes', paciente.id], { relativeTo: this.route });
  }

  public onError(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage,
    });
  }

  public onRemove(pacienteId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse paciente?',
    });

    dialogRef.afterClosed().subscribe((result: Boolean) => {
      if (result) {
        this.PacienteService.delete(pacienteId).subscribe({
          next: () => {
            this.refresh();
            this.toastr.success('Paciente removido com sucesso!', 'Sucesso!');
          },
          error: (error) => {
            this.alerts = error.error.errors;
            this.type = 'danger';
            this.toastr.error(
              'Ocorreu algum erro ao remover paciente!',
              'Falha!'
            );
          },
        });
      }
    });
  }

  private processarFalha(fail: any) {
    this.alerts = fail.error.errors;
  }

  private refresh() {
    this.PacienteService.get().subscribe({
      next: (pacientes) => {
        this.pacientes = pacientes;
        this.nenhumPaciente = true;
      },
      error: (error) => {
        this.alerts = error.error.errors;
        this.type = 'danger';
        this.toastr.error(
          'Ocorreu algum erro ao carregar os pacientes!',
          'Falha!'
        );
        this.nenhumPaciente = true;
      },
    });
  }
}
