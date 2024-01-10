import { Component } from '@angular/core';
import { asyncScheduler, of, scheduled } from 'rxjs';
import { MedicoService } from '../../../services/medico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { TipoSanguineoToLabelMapping } from '../../../enum/TipoSanguineo.enum';
import { GeneroToLabelMapping } from '../../../enum/Genero.enum';
import { Medico } from '../model/medico';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrl: './medicos.component.scss',
})
export class MedicosComponent {
  public detalheIcon = icon({ prefix: 'fas', iconName: 'list' });
  public editarIcon = icon({ prefix: 'fas', iconName: 'pen-to-square' });
  public excluirIcon = icon({ prefix: 'fas', iconName: 'trash-can' });
  public novoIcon = icon({ prefix: 'fas', iconName: 'plus' });

  public alerts: any[] = [];
  public type: string;
  public medicos: Medico[] = [];
  public nenhumMedico: boolean = false;

  public GeneroToLabelMapping = GeneroToLabelMapping;
  public TipoSanguineoToLabelMapping = TipoSanguineoToLabelMapping;

  public iterador = 0;
  public linha = new Array(15);
  public coluna = new Array(4);

  constructor(
    private MedicoService: MedicoService,
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

  public onEdit(medico: Medico) {
    this.router.navigate(['editar', medico.id], { relativeTo: this.route });
  }

  public onDetail(medico: Medico) {
    this.router.navigate(['detalhes', medico.id], { relativeTo: this.route });
  }

  public onRemove(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse medico?',
    });

    dialogRef.afterClosed().subscribe((result: Boolean) => {
      if (result) {
        this.MedicoService.delete(id).subscribe({
          next: () => {
            this.refresh();
            this.toastr.success('Medico removido com sucesso!', 'Sucesso!');
          },
          error: (response) => {
            this.alerts = response.error.errors;
            this.type = 'danger';
            this.toastr.error(
              'Ocorreu algum erro ao remover medico!',
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
    this.MedicoService.get().subscribe({
      next: (response: Medico[]) => {
        this.medicos = response;
        this.nenhumMedico = true;
      },
      error: (response) => {
        this.alerts = response.error.errors;
        this.type = 'danger';
        this.toastr.error(
          'Ocorreu algum erro ao carregar os medicos!',
          'Falha!'
        );
        this.nenhumMedico = true;
      },
    });
  }
}
