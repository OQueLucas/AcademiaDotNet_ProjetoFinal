import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChildren,
} from '@angular/core';
import {
  FormBuilder,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PacienteService } from '../../../services/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from '../models/Paciente';
import { Location } from '@angular/common';
import { Genero, GeneroToLabelMapping } from '../../../enum/Genero.enum';
import {
  TipoSanguineo,
  TipoSanguineoToLabelMapping,
} from '../../../enum/TipoSanguineo.enum';
import { FormUtilsService } from '../../../shared/form/form-utils.service';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilsService } from '../../../services/utils.service';
import { CepConsulta } from '../models/CepConsulta';
import { ToastrService } from 'ngx-toastr';
import { Observable, fromEvent, merge } from 'rxjs';

@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrl: './paciente-form.component.scss',
})
export class PacienteFormComponent implements OnInit, AfterViewInit {
  public titulo: string;
  public mudancasNaoSalvas: boolean;
  public alerts: any[] = [];
  public type: string;
  public form: FormGroup;

  public GeneroToLabelMapping = GeneroToLabelMapping;
  public generos = Object.values(Genero).filter(
    (value) => typeof value === 'number'
  );

  public TipoSanguineoToLabelMapping = TipoSanguineoToLabelMapping;
  public tiposSanguineo = Object.values(TipoSanguineo).filter(
    (value) => typeof value === 'number'
  );

  @ViewChildren(FormControlName, { read: ElementRef })
  private formInputElements: ElementRef[];

  constructor(
    private _formBuider: FormBuilder,
    private _pacienteService: PacienteService,
    private _location: Location,
    private route: ActivatedRoute,
    private router: Router,
    public formUtils: FormUtilsService,
    public utils: UtilsService,
    private _adapter: DateAdapter<any>,
    private toastr: ToastrService,
    @Inject(MAT_DATE_LOCALE) private _locale: string
  ) {
    this._locale = 'pt';
    this._adapter.setLocale(this._locale);
  }

  ngOnInit(): void {
    const paciente: Paciente = this.route.snapshot.data['paciente'];
    this.form = this._formBuider.group({
      id: [paciente.id],
      nome: [
        paciente.nome,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(100),
        ],
      ],
      pessoaId: [paciente.pessoaId],
      nomeSocial: [
        paciente.nomeSocial,
        [Validators.minLength(4), Validators.maxLength(30)],
      ],
      cpf: [
        paciente.cpf,
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(14),
        ],
      ],
      dataNascimento: [paciente.dataNascimento, Validators.required],
      email: [paciente.email, Validators.email],
      tipoSanguineo: [paciente.tipoSanguineo, Validators.required],
      genero: [paciente.genero, Validators.required],
      cep: [paciente.cep, [Validators.minLength(8), Validators.maxLength(8)]],
      bairro: [
        paciente.bairro,
        [Validators.minLength(5), Validators.maxLength(30)],
      ],
      endereco: [
        paciente.endereco,
        [Validators.minLength(8), Validators.maxLength(60)],
      ],
      telefone: [
        paciente.telefone,
        [Validators.minLength(10), Validators.maxLength(11)],
      ],
      observacao: [paciente.observacao],
    });
    this.setTitle();
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );

    merge(...controlBlurs).subscribe(() => {
      this.mudancasNaoSalvas = true;
    });
  }

  public buscarCep(cep: string) {
    if (cep.length < 8) return;
    this._pacienteService.consultarCep(cep).subscribe({
      next: (cepResponse) => this.preencherEnderecoConsulta(cepResponse),
      error: (erro) => this.alerts.push(erro),
    });
  }

  private preencherEnderecoConsulta(cepConsulta: CepConsulta) {
    this.form.patchValue({
      bairro: cepConsulta.bairro,
      endereco: cepConsulta.logradouro,
    });
  }

  public onSubmit() {
    if (this.form.valid) {
      this._pacienteService.save(this.form.value).subscribe({
        next: () => {
          this.form.reset();
          this.alerts = [];
          this.toastr.success('Paciente cadastrado com sucesso!', 'Sucesso!', {
            progressBar: true,
          });
          this.mudancasNaoSalvas = false;
        },
        error: (error: HttpErrorResponse) => {
          this.alerts = error.error.errors;
          this.type = 'danger';
          this.toastr.error('Ocorreu algum erro!', 'Falha!', {
            progressBar: true,
          });
        },
      });
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }
  }

  public onCancel(): void {
    this.voltar();
  }

  private voltar() {
    this._location.back();
  }

  private setTitle() {
    if (this.form.value.id === 0) {
      this.titulo = 'Novo paciente';
    } else {
      this.titulo = 'Editar paciente: ' + this.form.value.id;
    }
  }
}
