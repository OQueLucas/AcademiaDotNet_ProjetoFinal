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
  detalheIcon = icon({ prefix: 'fas', iconName: 'list' });
  editarIcon = icon({ prefix: 'fas', iconName: 'pen-to-square' });
  excluirIcon = icon({ prefix: 'fas', iconName: 'trash-can' });
  novoIcon = icon({ prefix: 'fas', iconName: 'plus' });

  public GeneroToLabelMapping = GeneroToLabelMapping;
  public TipoSanguineoToLabelMapping = TipoSanguineoToLabelMapping;

  alerts: any[] = [];
  type: string;

  medicos: Medico[] | null = null;

  constructor(
    private MedicoService: MedicoService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.refresh();
  }

  refresh() {
    this.MedicoService.get().subscribe({
      next: (response) => {
        this.medicos = response;
      },
      error: (error) => {
        this.alerts = error.error.errors;
        this.type = 'danger';
        this.toastr.error('Ocorreu algum ao carregar os medicos!', 'Falha!', {
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

  onEdit(medico: Medico) {
    this.router.navigate(['editar', medico.id], { relativeTo: this.route });
  }

  onDetail(medico: Medico) {
    this.router.navigate(['detalhes', medico.id], { relativeTo: this.route });
  }

  onRemove(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse medico?',
    });

    dialogRef.afterClosed().subscribe((result: Boolean) => {
      if (result) {
        this.MedicoService.delete(id).subscribe({
          next: () => {
            this.refresh();
            this.toastr.success('Medico removido com sucesso!', 'Sucesso!', {
              progressBar: true,
            });
          },
          error: (error) => {
            this.alerts = error.error.errors;
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
}
