import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Usuario } from '../../models/Usuario';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
})
export class UsuariosComponent {
  usuarios: Usuario[] = [];

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private adminService: AdminService
  ) {
    this.refresh();
  }

  refresh() {
    this.adminService.listarUsuarios().subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
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
