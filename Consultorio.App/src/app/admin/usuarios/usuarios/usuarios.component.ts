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
  usuarios: Usuario[] = [];
  detalheIcon = icon({ prefix: 'fas', iconName: 'list' });
  editarIcon = icon({ prefix: 'fas', iconName: 'pen-to-square' });
  excluirIcon = icon({ prefix: 'fas', iconName: 'trash-can' });

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private adminService: AdminService
  ) {
    this.refresh();
  }

  refresh() {
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

  remove(id: string) {
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
