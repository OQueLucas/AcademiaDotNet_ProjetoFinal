import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  UntypedFormArray,
  Validators,
  FormGroup,
} from '@angular/forms';
import {
  TipoSanguineo,
  TipoSanguineoToLabelMapping,
} from '../../../enum/TipoSanguineo.enum';
import { Genero, GeneroToLabelMapping } from '../../../enum/Genero.enum';
import { ConsultaService } from '../../../services/consulta.service';
import { ActivatedRoute } from '@angular/router';
import { FormUtilsService } from '../../../shared/form/form-utils.service';
import { Location } from '@angular/common';
import { Consulta } from '../model/consulta';
import {
  TipoConsulta,
  TipoConsultaToLabelMapping,
} from '../../../enum/TipoConsulta.enum';
import { PacienteService } from '../../../services/paciente.service';
import { Paciente } from '../../pacientes/models/Paciente';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../medicos/model/medico';
import { Sintoma } from '../../sintomas/model/sintoma';
import { SintomaConsulta } from '../model/sintomaConsulta';
import { SintomaService } from '../../../services/sintoma.service';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-consulta-form',
  templateUrl: './consulta-form.component.html',
  styleUrl: './consulta-form.component.scss',
})
export class ConsultaFormComponent {
  public titulo: string = '';
  public pacientes: Paciente[] = [];
  public medicos: Medico[] = [];
  public sintomas: Sintoma[] = [];
  public form: FormGroup;
  public mudancasNaoSalvas;

  public TipoConsultaToLabelMapping = TipoConsultaToLabelMapping;
  public tipoConsulta = Object.values(TipoConsulta).filter(
    (value) => typeof value === 'number'
  );

  public GeneroToLabelMapping = GeneroToLabelMapping;
  public generos = Object.values(Genero).filter(
    (value) => typeof value === 'number'
  );

  public TipoSanguineoToLabelMapping = TipoSanguineoToLabelMapping;
  public tiposSanguineo = Object.values(TipoSanguineo).filter(
    (value) => typeof value === 'number'
  );

  private sintomaSelecionado: SintomaConsulta;

  constructor(
    private _formBuider: FormBuilder,
    private _consultaService: ConsultaService,
    private _location: Location,
    private _route: ActivatedRoute,
    public formUtils: FormUtilsService,
    private _pacienteService: PacienteService,
    private _medicoService: MedicoService,
    private _sintomaService: SintomaService,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string
  ) {
    this._locale = 'pt';
    this._adapter.setLocale(this._locale);

    this._pacienteService.get().subscribe((pacientes: Paciente[]) => {
      this.pacientes = pacientes;
    });

    this._medicoService.get().subscribe((medicos: Medico[]) => {
      this.medicos = medicos;
    });

    this._sintomaService.get().subscribe((sintomas: Sintoma[]) => {
      this.sintomas = sintomas;
    });
    this.criarForm();
  }

  ngOnInit(): void {
    this.setTitle();
  }

  public selecionarMedico(event) {
    let id = Number((event.target as HTMLSelectElement).value);

    const medico: Medico = this.medicos.find((medico: Medico) => {
      return medico?.id == id;
    });

    this.form.patchValue({
      medicoId: medico.id,
      medicoCRM: medico.crm,
      especializacao: medico.especializacao,
      medicoNome: medico.nome,
      medicoNomeSocial: medico.nomeSocial,
    });
  }

  public getSintomasFormArray() {
    return (<UntypedFormArray>this.form.get('sintomas')).controls;
  }

  public removeSintoma(index: number) {
    const sintomas = this.form.get('sintomas') as UntypedFormArray;
    sintomas.removeAt(index);
  }

  public onSubmit() {
    if (this.form.valid) {
      this._consultaService.save(this.form.value).subscribe({
        next: () => {
          this.formUtils.message('Consulta cadastrado com sucesso!');
          this.voltar();
        },
        error: () => this.formUtils.message('Erro ao cadastrar consulta!'),
      });
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }
  }

  public onAddSintoma() {
    let anotado = false;
    const sintomas = this.form.get('sintomas') as UntypedFormArray;

    for (let c of this.getSintomasFormArray()) {
      if (c.value.sintomaId == this.sintomaSelecionado.sintomaId) {
        anotado = true;
      }
    }

    if (anotado) return;

    sintomas.push(this.novoSintoma(this.sintomaSelecionado));
    this.form.patchValue({ sintomaSelect: null });
  }

  public onSelectSintoma(event) {
    const id = Number((event.target as HTMLSelectElement).value);

    const sintoma = this.sintomas.find((sintoma: Sintoma) => {
      return sintoma?.id == id;
    });

    this.sintomaSelecionado = {
      id: null,
      sintomaId: sintoma.id,
      nome: sintoma.nome,
      consultaId: null,
    };
  }

  public onUpdateSintoma() {
    if (this.form.valid) {
      this._consultaService.putSintoma(this.form.value).subscribe({
        next: () => {
          this.formUtils.message('Sintomas atualizados com sucesso!');
        },
        error: () => this.formUtils.message('Erro ao atualizar sintomas!'),
      });
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }
  }

  public selecionarPaciente(event) {
    let id = Number((event.target as HTMLSelectElement).value);

    const paciente: Paciente = this.pacientes.find((paciente: Paciente) => {
      return paciente?.id == id;
    });

    this.form.patchValue({
      pacienteId: paciente.id,
      nome: paciente.nome,
      nomeSocial: paciente.nomeSocial,
      cpf: paciente.cpf,
      dataNascimento: paciente.dataNascimento,
      genero: paciente.genero,
      tipoSanguineo: paciente.tipoSanguineo,
      email: paciente.email,
      telefone: paciente.telefone,
    });
  }

  private criarForm() {
    const consulta: Consulta = this._route.snapshot.data['consulta'];
    this.form = this._formBuider.group({
      id: [consulta.id],
      tipoConsulta: [consulta.tipoConsulta, [Validators.required]],
      data: [consulta.data, [Validators.required]],
      medicoId: [consulta.medicoId, [Validators.required]],
      medicoCRM: [consulta.medicoCRM, [Validators.required]],
      especializacao: [consulta.especializacao],
      medicoNome: [consulta.medicoNome],
      medicoNomeSocial: [consulta.medicoNomeSocial],
      pacienteId: [consulta.pacienteId, [Validators.required]],
      nome: [consulta.nome],
      nomeSocial: [consulta.nomeSocial],
      cpf: [consulta.cpf],
      dataNascimento: [consulta.dataNascimento],
      genero: [consulta.genero],
      tipoSanguineo: [consulta.tipoSanguineo],
      email: [consulta.email],
      telefone: [consulta.telefone],
      descricao: [consulta.descricao],
      sintomas: this._formBuider.array(this.obterSintomas(consulta)),
      sintomaSelect: [],
    });
  }

  private obterSintomas(consulta: Consulta) {
    const sintomas: FormGroup[] = [];
    if (consulta?.sintomas) {
      consulta.sintomas.forEach((sintoma) =>
        sintomas.push(this.novoSintoma(sintoma))
      );
    }
    return sintomas;
  }

  private novoSintoma(
    sintoma: SintomaConsulta = {
      id: null,
      sintomaId: null,
      nome: '',
      consultaId: null,
    }
  ) {
    return this._formBuider.group({
      id: [sintoma.id],
      sintomaId: [sintoma.sintomaId, Validators.required],
      nome: [sintoma.nome],
    });
  }

  private setTitle() {
    if (this.form.value.id === 0) {
      this.titulo = 'Nova consulta';
    } else {
      this.titulo = 'Editar consulta: ' + this.form.value.id;
    }
  }

  public onCancel(): void {
    this.voltar();
  }

  private voltar() {
    this._location.back();
  }
}
