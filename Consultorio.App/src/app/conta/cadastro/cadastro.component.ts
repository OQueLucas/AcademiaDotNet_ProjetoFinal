import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChildren,
} from '@angular/core';
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
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  alerts: any[] = [];
  type: string;
  mensagens: any[] = [];
  cadastroForm: FormGroup;
  usuario: UsuarioLogin;

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  mudancasNaoSalvas: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private contaService: ContaService,
    private utils: UtilsService,
    private router: Router,
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
      confirmPassword: {
        required: 'Informe a senha novamente',
        // rangeLength: 'A senha de possui entre 6 e 15 caracteres',
        // equalTo: 'As senhas não conferem',
      },
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    let senha = new FormControl('', [
      Validators.required,
      // CustomValidators.rangeLength([6, 15]),
    ]);
    let confirmSenha = new FormControl('', [
      Validators.required,
      // CustomValidators.rangeLength([6, 15]),
      // CustomValidators.equalTo(senha),
    ]);

    this.cadastroForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: senha,
      confirmPassword: confirmSenha,
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(
        this.cadastroForm
      );
      this.mudancasNaoSalvas = true;
    });
  }

  adicionarConta() {
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);

      this.contaService.registrarUsuario(this.usuario).subscribe({
        next: (response) => {
          this.cadastroForm.reset();
          this.alerts = [];

          this.contaService.LocalStorage.salvarDadosLocaisUsuario(response);
          let toastr = this.toastr.success(
            'Registro realizado com sucesso!',
            'Bem vindo!!!'
          );
          if (toastr) {
            toastr.onHidden.subscribe(() => {
              this.router.navigate(['/home']);
            });
          }
        },
        error: (falha) => {
          this.alerts = falha.error.errors;
          this.type = 'danger';
          this.toastr.error('Ocorreu um erro!', 'Opa :(');
        },
      });

      this.mudancasNaoSalvas = false;
    }
  }
}
