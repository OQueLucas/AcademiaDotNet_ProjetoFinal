import { Component, ElementRef, ViewChildren } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UsuarioLogin } from '../models/UsuarioLogin';
import { ContaService } from '../services/conta.service';
import {
  ValidationMessages,
  GenericValidator,
  DisplayMessage,
} from '../../utils/generic-form-validation';
// import { CustomValidators } from '@narik/custom-validators';
import { ToastrService } from 'ngx-toastr';
import { Observable, fromEvent, merge } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { icon } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  public loginIcon = icon({ prefix: 'fas', iconName: 'right-to-bracket' });

  public alerts: any[] = [];
  public type: string;
  public mensagens: any[] = [];
  public loginForm: FormGroup;
  private usuario: UsuarioLogin;

  private returnUrl: string;

  private validationMessages: ValidationMessages;
  private genericValidator: GenericValidator;
  public displayMessage: DisplayMessage = {};

  constructor(
    private formBuilder: FormBuilder,
    private contaService: ContaService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido',
      },
      password: {
        required: 'Informe a senha',
        // rangeLength: 'A senha de possui entre 6 e 15 caracteres',
      },
    };

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    let senha = new FormControl('', [
      Validators.required,
      // CustomValidators.rangeLength([6, 15]),
    ]);

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          // CustomValidators.rangeLength([6, 15]),
        ],
      ],
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(
        this.loginForm
      );
    });
  }

  public login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.loginForm.value);

      this.contaService.login(this.usuario).subscribe({
        next: (response) => {
          this.loginForm.reset();
          this.alerts = [];

          this.contaService.LocalStorage.salvarDadosLocaisUsuario(response);
          this.toastr.success('Login realizado com sucesso!', 'Bem vindo!!!', {
            progressBar: true,
          });
          this.returnUrl
            ? this.router.navigate([this.returnUrl])
            : this.router.navigate(['/home']);
        },
        error: (falha) => {
          this.type = 'danger';
          this.alerts = falha.error.errors;
          this.toastr.error('Ocorreu um erro!', 'Opa :(');
          this.type = 'danger';
        },
      });
    }
  }
}
