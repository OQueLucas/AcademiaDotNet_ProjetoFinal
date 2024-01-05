import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PacienteService } from '../../../services/paciente.service';
import { ActivatedRoute } from '@angular/router';
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

@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrl: './paciente-form.component.scss',
})
export class PacienteFormComponent {
  titulo: string;

  alerts: any[] = [];

  setTitle() {
    if (this.form.value.id === 0) {
      this.titulo = 'Novo paciente';
    } else {
      this.titulo = 'Editar paciente: ' + this.form.value.id;
    }
  }

  public GeneroToLabelMapping = GeneroToLabelMapping;
  public generos = Object.values(Genero).filter(
    (value) => typeof value === 'number'
  );

  public TipoSanguineoToLabelMapping = TipoSanguineoToLabelMapping;
  public tiposSanguineo = Object.values(TipoSanguineo).filter(
    (value) => typeof value === 'number'
  );

  form: FormGroup;

  constructor(
    private _formBuider: FormBuilder,
    private _pacienteService: PacienteService,
    private _location: Location,
    private _route: ActivatedRoute,
    public formUtils: FormUtilsService,
    public utils: UtilsService,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string
  ) {
    this._locale = 'pt';
    this._adapter.setLocale(this._locale);
  }

  ngOnInit(): void {
    const paciente: Paciente = this._route.snapshot.data['paciente'];
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

  onSubmit() {
    if (this.form.valid) {
      this._pacienteService.save(this.form.value).subscribe({
        next: () => {
          this.alerts = this.utils.processarSucesso(
            'success',
            'Paciente cadastrado com sucesso!'
          );
        },
        error: (error: HttpErrorResponse) => {
          this.alerts = this.utils.processarFalha('danger', error);
        },
      });
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }
  }

  onCancel(): void {
    this.voltar();
  }

  voltar() {
    this._location.back();
  }
}
