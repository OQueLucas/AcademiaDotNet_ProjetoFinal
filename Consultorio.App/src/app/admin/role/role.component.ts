import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Role } from '../models/Role';
import { ToastrService } from 'ngx-toastr';
import { icon } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-conta',
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss',
})
export class RoleComponent {
  public detalheIcon = icon({ prefix: 'fas', iconName: 'list' });
  public editarIcon = icon({ prefix: 'fas', iconName: 'pen-to-square' });
  public excluirIcon = icon({ prefix: 'fas', iconName: 'trash-can' });
  public novoIcon = icon({ prefix: 'fas', iconName: 'plus' });

  public nenhumaRole: boolean = false;
  public iterador = 0;
  public linha = new Array(15);
  public coluna = new Array(4);

  public roles: Role[] = [];

  public alerts: any[] = [];
  public type: string;

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ) {
    this.refresh();
  }

  public remove(id: string) {
    this.adminService.removerRole(id).subscribe({
      next: () => {
        this.toastr.success('Role removido com sucesso!', 'Sucesso!');
        this.refresh();
        this.nenhumaRole = false;
      },
      error: () => {
        this.toastr.error('Erro ao remover role!', 'erro!');
      },
    });
  }

  private refresh() {
    this.adminService.getRoles().subscribe({
      next: (response) => {
        this.roles = response;
        this.nenhumaRole = false;
      },
      error: (error) => {
        this.alerts = error.error.errors;
        this.type = 'danger';
        this.toastr.error('Ocorreu algum erro ao carregar as roles!', 'Falha!');
        this.nenhumaRole = true;
      },
    });
  }
}
