import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Role } from '../models/Role';
import { asyncScheduler, of, scheduled } from 'rxjs';
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
        this.toastr.success('Role removido com sucesso!', 'Sucesso!', {
          progressBar: true,
        });
        this.refresh();
      },
      error: () => {
        this.toastr.error('Erro ao remover role!', 'erro!', {
          progressBar: true,
        });
      },
    });
  }

  private refresh() {
    this.adminService.getRoles().subscribe({
      next: (response) => {
        this.roles = response;
      },
      error: (error) => {
        this.alerts = error.error.errors;
        this.type = 'danger';
        this.toastr.error('Ocorreu algum ao carregar as roles!', 'Falha!', {
          progressBar: true,
        });
        return scheduled(of([]), asyncScheduler);
      },
    });
  }
}
