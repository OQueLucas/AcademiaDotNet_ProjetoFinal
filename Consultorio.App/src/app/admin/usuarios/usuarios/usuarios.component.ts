import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../services/admin.service';
import { Usuario } from '../../models/Usuario';
import { icon } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
})
export class UsuariosComponent {
  public usuarios: Usuario[] = [];
  public detalheIcon = icon({ prefix: 'fas', iconName: 'list' });
  public editarIcon = icon({ prefix: 'fas', iconName: 'pen-to-square' });
  public excluirIcon = icon({ prefix: 'fas', iconName: 'trash-can' });
  public novoIcon = icon({ prefix: 'fas', iconName: 'plus' });

  public nenhumUsuario: boolean = false;
  public iterador = 0;
  public linha = new Array(15);
  public coluna = new Array(4);

  public alerts: any[] = [];
  public type: string;

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private adminService: AdminService
  ) {
    this.refresh();
  }

  public remove(id: string) {
    this.adminService.removerUsuario(id).subscribe({
      next: () => {
        this.toastr.success('Usuário removido com sucesso!', 'Sucesso!');
        this.refresh();
      },
      error: () => {
        this.toastr.error('Erro ao remover usuário!', 'erro!');
      },
    });
  }

  private refresh() {
    this.spinner.show();
    this.adminService.listarUsuarios().subscribe({
      next: (response: Usuario[]) => {
        this.usuarios = response;
        this.nenhumUsuario = false;
      },
      error: (response) => {
        this.alerts = response.error.errors;
        this.type = 'danger';
        this.toastr.error(
          'Ocorreu algum erro ao carregar os usuários!',
          'Falha!'
        );
        this.nenhumUsuario = true;
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  }
}
