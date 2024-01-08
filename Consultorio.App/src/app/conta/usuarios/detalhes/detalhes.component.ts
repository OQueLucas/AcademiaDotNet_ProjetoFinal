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

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.scss',
})
export class DetalhesComponent implements AfterViewInit {
  usuario: Usuario;
  form: FormGroup;
  roles: UserRole[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private formBuilder: FormBuilder
  ) {
    this.usuario = this.route.snapshot.data['usuario'];
    this.adminService
      .obterRolesUsuario(this.usuario.id)
      .subscribe((roles: UserRole[]) => {
        this.roles = roles;
        this.buildForm();
      });
  }
  buildForm() {
    this.form = this.formBuilder.group({
      userId: this.usuario.id,
      roles: this.buildRoles(),
    });
  }

  buildRoles() {
    const values = this.roles.map((role) => {
      new FormControl(role.isSelected);
    });
    return this.formBuilder.array(values);
  }

  public getRoleFormArray() {
    return (<UntypedFormArray>this.form.get('roles')).controls;
  }

  ngAfterViewInit(): void {}

  onSubmit() {
    let valueSubmit = Object.assign({}, this.form.value);

    valueSubmit = Object.assign(valueSubmit, {
      roles: valueSubmit.roles
        .map((valor, index) => (valor ? this.roles[index] : null))
        .filter((valor) => valor !== null),
    });

    console.log(valueSubmit);
  }
}
