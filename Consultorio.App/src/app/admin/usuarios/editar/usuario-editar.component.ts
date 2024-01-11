import { Component, ElementRef, ViewChildren } from '@angular/core';
import {
  FormBuilder,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { Usuario } from '../../models/Usuario';
import {
  DisplayMessage,
  GenericValidator,
  ValidationMessages,
} from '../../../utils/generic-form-validation';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, fromEvent, merge } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-usuario-editar',
  templateUrl: './usuario-editar.component.html',
  styleUrl: './usuario-editar.component.scss',
})
export class UsuarioEditarComponent {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  public editIcon = icon({ prefix: 'fas', iconName: 'edit' });

  public alerts: any[] = [];
  public type: string;
  public mensagens: any[] = [];
  public editForm: FormGroup;
  private usuario: Usuario;

  private validationMessages: ValidationMessages;
  private genericValidator: GenericValidator;
  public displayMessage: DisplayMessage = {};

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.usuario = this.route.snapshot.data['usuario'];
    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido',
      },
      userName: {
        required: 'Informe o User Name',
      },
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      email: [this.usuario.email, [Validators.required, Validators.email]],
      userName: [this.usuario.userName, [Validators.required]],
      phoneNumber: [this.usuario.phoneNumber, [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(
        this.editForm
      );
    });
  }

  public editar() {
    if (this.editForm.dirty && this.editForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.editForm.value);

      this.adminService.put(this.usuario).subscribe({
        next: () => {
          this.alerts = [];
          this.toastr.success('Usuário editado com sucesso!', 'Sucesso!');
          this.location.back();
        },
        error: (falha) => {
          this.type = 'danger';
          this.alerts = falha.error.errors;
          this.toastr.error('Ocorreu um erro!', 'Opa :(');
        },
      });
    }
  }
}
