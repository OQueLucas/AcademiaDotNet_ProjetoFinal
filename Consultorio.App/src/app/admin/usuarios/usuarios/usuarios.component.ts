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

  public alerts: any[] = [];
  public type: string;

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private adminService: AdminService
  ) {
    this.refresh();
  }

  private refresh() {
    this.spinner.show();
    this.adminService.listarUsuarios().subscribe({
      next: (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  }

  public remove(id: string) {
    this.adminService.removerUsuario(id).subscribe({
      next: () => {
        this.toastr.success('Usuário removido com sucesso!', 'Sucesso!', {
          progressBar: true,
        });
        this.refresh();
      },
      error: () => {
        this.toastr.error('Erro ao remover usuário!', 'erro!', {
          progressBar: true,
        });
      },
    });
  }
}
