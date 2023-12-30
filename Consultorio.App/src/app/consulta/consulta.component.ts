import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Consulta } from '../models/Consulta';
import { Genero, GeneroToLabelMapping } from '../models/enum/Genero.enum';
import {
  TipoConsulta,
  TipoConsultaToLabelMapping,
} from '../models/enum/TipoConsulta.enum';
import {
  TipoSanguineo,
  TipoSanguineoToLabelMapping,
} from '../models/enum/TipoSanguineo.enum';
import { Medico } from '../models/Medico';
import { Paciente } from '../models/Paciente';
import { Sintoma } from '../models/Sintoma';
import { SintomaConsulta } from '../models/SintomaConsulta';
import { ConsultaService } from '../services/consulta.service';
import { MedicoService } from '../services/medico.service';
import { PacienteService } from '../services/paciente.service';
import { SintomaService } from '../services/sintoma.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss',
})
export class ConsultaComponent {
  titulo = 'Consultas';

  consultas: Consulta[] = [];
  sintomas: SintomaConsulta[] = [];

  pacientes: Paciente[] = [];
  medicos: Medico[] = [];

  sintomasForm: Sintoma[] = [];

  pacienteForm: Paciente[] = [];
  medicoForm: Medico[] = [];

  public consultaForm: FormGroup;
  public consultaSelecionado: Consulta;

  public modo = 'post';

  sintomaSelecionado: Sintoma;

  generoSelecionado = 'null';
  public generos = Object.values(Genero).filter(
    (value) => typeof value === 'number'
  );
  public GeneroToLabelMapping = GeneroToLabelMapping;

  tipoSanguineoSelecionado = 'null';
  public tipoSanguineo = Object.values(TipoSanguineo).filter(
    (value) => typeof value === 'number'
  );
  public TipoSanguineoToLabelMapping = TipoSanguineoToLabelMapping;

  TipoConsultaSelecionado = 'null';
  public tipoConsulta = Object.values(TipoConsulta).filter(
    (value) => typeof value === 'number'
  );
  public TipoConsultaToLabelMapping = TipoConsultaToLabelMapping;

  constructor(
    private fb: FormBuilder,
    private ConsultaService: ConsultaService,
    private SintomaService: SintomaService,
    private PacienteService: PacienteService,
    private MedicoService: MedicoService
  ) {
    this.criarForm();
  }

  ngOnInit(): void {
    this.getConsultas();
    this.getSintomas();
    this.getPacientes();
    this.getMedicos();
  }

  getSintomas() {
    this.SintomaService.get().subscribe((sintomas: Sintoma[]) => {
      this.sintomasForm = sintomas;
    });
  }

  getPacientes() {
    this.PacienteService.get().subscribe((pacientes: Paciente[]) => {
      this.pacientes = pacientes;
    });
  }

  getMedicos() {
    this.MedicoService.get().subscribe((medicos: Medico[]) => {
      this.medicos = medicos;
    });
  }

  salvarSintoma() {
    let anotado: boolean = false;

    this.sintomas.find((sintoma) => {
      if (sintoma.sintomaId == this.sintomaSelecionado.id) {
        return (anotado = true);
      }
      return (anotado = false);
    });

    if (anotado) return;

    this.sintomas.push({
      sintomaId: this.sintomaSelecionado.id,
      nome: this.sintomaSelecionado.nome,
    });
    this.consultaForm.patchValue({ sintomas: this.sintomas });
  }

  selecionarSintoma(event) {
    let id = Number((event.target as HTMLSelectElement).value);

    const sintoma: Sintoma = this.sintomasForm.find((sintoma: Sintoma) => {
      return sintoma?.id == id;
    });

    this.sintomaSelecionado = sintoma;
  }

  selecionarPaciente(event) {
    let id = Number((event.target as HTMLSelectElement).value);

    const paciente: Paciente = this.pacientes.find((paciente: Paciente) => {
      return paciente?.id == id;
    });

    this.consultaForm.patchValue({
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

    this.consultaForm.patchValue({
      medicoId: medico.id,
      medicoCRM: medico.crm,
      especializacao: medico.especializacao,
      medicoNome: medico.nome,
      medicoNomeSocial: medico.nomeSocial,
    });
  }

  getConsultas() {
    this.ConsultaService.getConsulta().subscribe((consultas: Consulta[]) => {
      this.consultas = consultas;
    });
  }

  criarForm() {
    this.consultaForm = this.fb.group({
      id: [''],
      tipoConsulta: [''],
      descricao: [''],
      data: [''],
      medicoId: [''],
      medicoSelect: [''],
      medicoCRM: [''],
      especializacao: [''],
      medicoNome: [''],
      medicoNomeSocial: [''],
      pacienteId: [''],
      pacienteSelect: [''],
      nome: [''],
      nomeSocial: [''],
      cpf: [''],
      dataNascimento: [''],
      email: [''],
      sintomas: this.sintomas,
      telefone: [''],
      tipoSanguineo: [''],
      genero: [''],
      sintomasSelect: [],
    });
  }

  saveConsulta(consulta: Consulta) {
    consulta.id === 0 ? (this.modo = 'post') : (this.modo = 'put');

    this.ConsultaService[this.modo](consulta).subscribe((retorno: Consulta) => {
      this.getConsultas();
      this.consultaSelecionado = retorno;
    });
  }

  consultaSubmit() {
    this.saveConsulta(this.consultaForm.value);
  }

  consultaSelect(consulta: Consulta) {
    this.consultaSelecionado = consulta;
    this.sintomas = consulta.sintomas;
    this.consultaForm.patchValue(consulta);
  }

  consultaNovo() {
    this.consultaSelecionado = new Consulta();
    this.consultaForm.patchValue(this.consultaSelecionado);
  }

  voltar() {
    this.consultaSelecionado = null;
  }
}
