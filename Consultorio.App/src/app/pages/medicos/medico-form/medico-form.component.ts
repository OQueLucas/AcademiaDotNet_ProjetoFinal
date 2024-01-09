import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Genero, GeneroToLabelMapping } from '../../../enum/Genero.enum';
import {
  TipoSanguineo,
  TipoSanguineoToLabelMapping,
} from '../../../enum/TipoSanguineo.enum';
import { FormUtilsService } from '../../../shared/form/form-utils.service';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../model/medico';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-medico-form',
  templateUrl: './medico-form.component.html',
  styleUrl: './medico-form.component.scss',
})
export class MedicoFormComponent {
  titulo: string;
  mudancasNaoSalvas: boolean;

  setTitle() {
    if (this.form.value.id === 0) {
      this.titulo = 'Novo medico';
    } else {
      this.titulo = 'Editar medico: ' + this.form.value.id;
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
    private _medicoService: MedicoService,
    private _location: Location,
    private _route: ActivatedRoute,
    public formUtils: FormUtilsService,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string
  ) {
    this._locale = 'pt';
    this._adapter.setLocale(this._locale);
  }

  ngOnInit(): void {
    const medico: Medico = this._route.snapshot.data['medico'];
    this.form = this._formBuider.group({
      id: [medico.id],
      nome: [
        medico.nome,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(100),
        ],
      ],
      pessoaId: [medico.pessoaId],
      nomeSocial: [
        medico.nomeSocial,
        [Validators.minLength(4), Validators.maxLength(30)],
      ],
      crm: [
        medico.crm,
        [Validators.required, Validators.minLength(7), Validators.maxLength(7)],
      ],
      especializacao: [
        medico.especializacao,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30),
        ],
      ],
      cpf: [
        medico.cpf,
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(14),
        ],
      ],
      dataNascimento: [medico.dataNascimento, Validators.required],
      email: [medico.email, Validators.email],
      tipoSanguineo: [medico.tipoSanguineo, Validators.required],
      genero: [medico.genero, Validators.required],
      cep: [medico.cep, [Validators.minLength(8), Validators.maxLength(8)]],
      bairro: [
        medico.bairro,
        [Validators.minLength(5), Validators.maxLength(30)],
      ],
      endereco: [
        medico.endereco,
        [Validators.minLength(8), Validators.maxLength(60)],
      ],
      telefone: [
        medico.telefone,
        [Validators.minLength(10), Validators.maxLength(11)],
      ],
    });
    this.setTitle();
  }

  onSubmit() {
    if (this.form.valid) {
      this._medicoService.save(this.form.value).subscribe({
        next: () => {
          this.formUtils.message('Medico cadastrado com sucesso!');
          this.voltar();
        },
        error: () => this.formUtils.message('Erro ao cadastrar medico!'),
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
