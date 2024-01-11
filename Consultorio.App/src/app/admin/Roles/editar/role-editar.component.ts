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
  selector: 'app-role-editar',
  templateUrl: './role-editar.component.html',
  styleUrl: './role-editar.component.scss',
})
export class RoleEditarComponent {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  public editIcon = icon({ prefix: 'fas', iconName: 'edit' });

  public alerts: any[] = [];
  public type: string;
  public mensagens: any[] = [];
  public editForm: FormGroup;
  private role: Role;

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
    this.role = this.route.snapshot.data['role'];
    this.validationMessages = {
      name: {
        required: 'Informe o nome da role',
      },
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      name: [this.role.name, [Validators.required]],
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
      this.role = Object.assign({}, this.role, this.editForm.value);

      this.adminService.putRole(this.role).subscribe({
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
