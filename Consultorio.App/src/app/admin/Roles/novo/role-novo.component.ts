import { Component, ElementRef, ViewChildren } from '@angular/core';
import {
  FormBuilder,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { icon } from '@fortawesome/fontawesome-svg-core';
import {
  DisplayMessage,
  GenericValidator,
  ValidationMessages,
} from '../../../utils/generic-form-validation';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, fromEvent, merge } from 'rxjs';
import { Role } from '../../models/Role';
import { Location } from '@angular/common';

@Component({
  selector: 'app-role-novo',
  templateUrl: './role-novo.component.html',
  styleUrl: './role-novo.component.scss',
})
export class RoleNovoComponent {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  public adicionarIcon = icon({ prefix: 'fas', iconName: 'plus' });

  public alerts: any[] = [];
  public type: string;
  public mensagens: any[] = [];
  public form: FormGroup;
  private role: Role;

  private validationMessages: ValidationMessages;
  private genericValidator: GenericValidator;
  public displayMessage: DisplayMessage = {};

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private location: Location,
    private toastr: ToastrService
  ) {
    this.validationMessages = {
      name: {
        required: 'Informe o nome da role',
      },
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      normalizedName: ['', [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.form);
    });
  }

  public adicionar() {
    if (this.form.dirty && this.form.valid) {
      this.role = Object.assign({}, this.role, this.form.value);
      console.log(this.role);
      this.adminService.adicionarRoles(this.role.name).subscribe({
        next: () => {
          this.alerts = [];
          this.toastr.success('Role editado com sucesso!', 'Sucesso!');
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
