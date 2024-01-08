import { Component } from '@angular/core';
import { ContaService } from '../services/conta.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Role } from '../models/Role';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-conta',
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss',
})
export class RoleComponent {
  roles: Role[] = [];

  constructor(
    private spinner: NgxSpinnerService,
    private adminService: AdminService
  ) {
    this.refresh();
  }

  refresh() {
    this.adminService.getRoles().subscribe((roles: Role[]) => {
      this.roles = roles;
    });
  }
}
