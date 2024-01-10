import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { asyncScheduler, of, scheduled } from 'rxjs';

import { SintomaService } from '../../../services/sintoma.service';
import { Sintoma } from '../model/sintoma';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { ToastrService } from 'ngx-toastr';

// type AlertType = { type: string; msg: string };

@Component({
  selector: 'app-sintomas',
  templateUrl: './sintomas.component.html',
  styleUrl: './sintomas.component.scss',
})
export class SintomasComponent {
  public detalheIcon = icon({ prefix: 'fas', iconName: 'list' });
  public editarIcon = icon({ prefix: 'fas', iconName: 'pen-to-square' });
  public excluirIcon = icon({ prefix: 'fas', iconName: 'trash-can' });
  public novoIcon = icon({ prefix: 'fas', iconName: 'plus' });

  public alerts: any[] = [];
  public type: string;

  public titulo = 'Sintomas';

  public sintomas: Sintoma[] = [];
  public nenhumSintoma: boolean = false;

  public iterador = 0;
  public linha = new Array(15);
  public coluna = new Array(2);

  constructor(
    private SintomaService: SintomaService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.refresh();
  }

  refresh() {
    this.SintomaService.get().subscribe({
      next: (response) => {
        this.sintomas = response;
        this.nenhumSintoma = true;
      },
      error: (error) => {
        this.alerts = error.error.errors;
        this.type = 'danger';
        this.toastr.error(
          'Ocorreu algum erro ao carregar os sintomas!',
          'Falha!'
        );
        this.nenhumSintoma = true;
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

  onRemove(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse sintoma?',
    });

    dialogRef.afterClosed().subscribe((result: Boolean) => {
      if (result) {
        this.SintomaService.delete(id).subscribe({
          next: () => {
            this.refresh();
            this.toastr.success('Sintoma removido com sucesso!', 'Sucesso!');
          },
          error: (error) => {
            this.alerts = error.error.errors;
            this.type = 'danger';
            this.toastr.error(
              'Ocorreu algum erro ao remover sintoma!',
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
