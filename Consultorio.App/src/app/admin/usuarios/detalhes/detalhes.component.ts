import { AfterViewInit, Component } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserRole } from '../../models/UserRole';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormArray,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.scss',
})
export class DetalhesComponent {
  public usuario: Usuario;
  public form: FormGroup;
  public roles: UserRole[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.usuario = this.route.snapshot.data['usuario'];
    this.adminService
      .obterRolesUsuario(this.usuario.id)
      .subscribe((roles: UserRole[]) => {
        this.roles = roles;
        this.buildForm();
      });
  }

  public getRoleFormArray() {
    return (<UntypedFormArray>this.form.get('roles')).controls;
  }

  public onSubmit() {
    let valueSubmit = Object.assign({}, this.form.value);

    valueSubmit = Object.assign(valueSubmit, {
      roles: valueSubmit.roles
        .map((valor, index) => (valor ? this.roles[index] : null))
        .filter((valor) => valor !== null),
    });

    this.adminService
      .adicionarRolesUsuario(this.usuario.id, this.roles)
      .subscribe({
        next: () => {
          this.form.reset();
          this.toastr.success('Permissões alteradas com sucesso!', 'Sucesso!');
          this.reloadCurrentRoute();
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error('Ocorreu algum erro! ' + error, 'Falha!');
        },
      });
  }

  private reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      userId: this.usuario.id,
      roles: this.buildRoles(),
    });
  }

  private buildRoles() {
    const values = this.roles.map((role) => {
      new FormControl(role.isSelected);
    });
    return this.formBuilder.array(values);
  }
}
