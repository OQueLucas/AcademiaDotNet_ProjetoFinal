import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { SintomaService } from '../../../services/sintoma.service';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { Sintoma } from '../model/sintoma';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

// type AlertType = { type: string; msg: string };

@Component({
  selector: 'app-sintomas',
  templateUrl: './sintomas.component.html',
  styleUrl: './sintomas.component.scss',
})
export class SintomasComponent {
  titulo = 'Sintomas';

  // sintomas$: Observable<Sintoma[]>;
  sintomas$: Observable<Sintoma[]> | null = null;

  displayedColumns = ['id', 'nome', 'actions'];

  constructor(
    private SintomaService: SintomaService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  refresh() {
    this.sintomas$ = this.SintomaService.get().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar Sintomas.');
        return of([]);
      })
    );
  }

  ngOnInit(): void {}

  onAdd() {
    this.router.navigate(['novo'], { relativeTo: this.route });
  }

  onEdit(sintoma: Sintoma) {
    this.router.navigate(['editar', sintoma.id], { relativeTo: this.route });
  }

  onError(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage,
    });
  }

  onRemove(sintoma: Sintoma) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse sintoma?',
    });

    dialogRef.afterClosed().subscribe((result: Boolean) => {
      if (result) {
        this.SintomaService.delete(sintoma.id).subscribe({
          next: () => {
            this.refresh();
            this.onSuccess();
          },
          error: (error) => {
            this.onError('Erro ao tentar remover sintoma.');
          },
        });
      }
    });
  }

  private onSuccess() {
    this._snackBar.open('Sintoma removido com sucesso!', 'X', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
