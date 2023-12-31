import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormArray,
  Validators,
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

@Component({
  selector: 'app-consulta-form',
  templateUrl: './consulta-form.component.html',
  styleUrl: './consulta-form.component.scss',
})
export class ConsultaFormComponent {
  titulo: string;
  pacientes: Paciente[] = [];
  medicos: Medico[] = [];
  sintomas: Sintoma[] = [];

  setTitle() {
    if (this.form.value.id === 0) {
      this.titulo = 'Novo consulta';
    } else {
      this.titulo = 'Editar consulta: ' + this.form.value.id;
    }
  }

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

  form: FormGroup;

  constructor(
    private _formBuider: FormBuilder,
    private _consultaService: ConsultaService,
    private _location: Location,
    private _route: ActivatedRoute,
    public formUtils: FormUtilsService,
    private _pacienteService: PacienteService,
    private _medicoService: MedicoService,
    private _sintomaService: SintomaService
  ) {
    this._pacienteService.get().subscribe((pacientes: Paciente[]) => {
      this.pacientes = pacientes;
    });

    this._medicoService.get().subscribe((medicos: Medico[]) => {
      this.medicos = medicos;
    });

    this._sintomaService.get().subscribe((sintomas: Sintoma[]) => {
      this.sintomas = sintomas;
    });
  }

  ngOnInit(): void {
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
    });
    this.setTitle();
  }

  private obterSintomas(consulta: Consulta) {
    const sintomas = [];
    if (consulta?.sintomas) {
      consulta.sintomas.forEach((sintoma) =>
        sintomas.push(this.novoSintoma(sintoma))
      );
    } else {
      sintomas.push(this.novoSintoma());
    }
    return sintomas;
  }

  private novoSintoma(
    sintoma: SintomaConsulta = { id: null, sintomaId: null, nome: '' }
  ) {
    return this._formBuider.group({
      id: [sintoma.id],
      sintomaId: [sintoma.sintomaId, Validators.required],
      nome: [sintoma.nome],
    });
  }

  getSintomasFormArray() {
    return (<UntypedFormArray>this.form.get('sintomas')).controls;
  }

  addNovoSintoma() {
    const sintomas = this.form.get('sintomas') as UntypedFormArray;
    sintomas.push(this.novoSintoma());
  }

  removeSintoma(index: number) {
    const sintomas = this.form.get('sintomas') as UntypedFormArray;
    sintomas.removeAt(index);
  }

  onSubmit() {
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

  onCancel(): void {
    this.voltar();
  }

  voltar() {
    this._location.back();
  }

  selecionarPaciente(event) {
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

  selecionarMedico(event) {
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
}
