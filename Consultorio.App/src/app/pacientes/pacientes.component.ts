import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Genero, GeneroToLabelMapping } from '../models/enum/Genero.enum';
import {
  TipoSanguineo,
  TipoSanguineoToLabelMapping,
} from '../models/enum/TipoSanguineo.enum';
import { Paciente } from '../models/Paciente';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.scss',
})
export class PacientesComponent implements OnInit {
  titulo = 'Pacientes';

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  public pacientes: Paciente[] = [];

  public pacienteForm: FormGroup = this.fb.group({
    id: [''],
    pessoaId: [''],
    nome: ['', Validators.required],
    nomeSocial: [''],
    cpf: ['', Validators.required],
    dataNascimento: ['', Validators.required],
    email: [this.emailFormControl],
    tipoSanguineo: ['', Validators.required],
    genero: ['', Validators.required],
    cep: [''],
    bairro: [''],
    endereco: [''],
    telefone: [''],
    observacao: [''],
  });

  public pacienteSelecionado: Paciente;

  public modo = 'post';

  public GeneroToLabelMapping = GeneroToLabelMapping;
  public generos = Object.values(Genero).filter(
    (value) => typeof value === 'number'
  );

  public TipoSanguineoToLabelMapping = TipoSanguineoToLabelMapping;
  public tipoSanguineo = Object.values(TipoSanguineo).filter(
    (value) => typeof value === 'number'
  );
  generoSelecionado = 'null';
  tipoSanguineoSelecionado = 'null';

  constructor(
    private fb: FormBuilder,
    private PacienteService: PacienteService
  ) {
    this.criarForm();
  }

  ngOnInit(): void {
    this.getPacientes();
  }

  getPacientes() {
    this.PacienteService.getPaciente().subscribe((pacientes: Paciente[]) => {
      this.pacientes = pacientes;
    });
  }

  criarForm() {
    this.pacienteForm = this.fb.group({
      id: [''],
      pessoaId: [''],
      nome: ['', Validators.required],
      nomeSocial: [''],
      cpf: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      email: [this.emailFormControl],
      tipoSanguineo: ['', Validators.required],
      genero: ['', Validators.required],
      cep: [''],
      bairro: [''],
      endereco: [''],
      telefone: [''],
      observacao: [''],
    });
  }

  savePaciente(paciente: Paciente) {
    // paciente.id === 0 ? (this.modo = 'post') : (this.modo = 'put');
    // this.PacienteService.post(paciente).subscribe((retorno: Paciente) => {
    //   this.getPacientes();
    //   this.pacienteSelecionado = retorno;
    // });
  }

  pacienteSubmit() {
    this.savePaciente(this.pacienteForm.value);
  }

  editPaciente(paciente: Paciente) {
    this.pacienteSelecionado = { ...paciente };
  }

  pacienteSelect(paciente: Paciente) {
    this.pacienteSelecionado = paciente;
    this.pacienteForm.patchValue(paciente);
  }

  pacienteNovo() {
    this.pacienteSelecionado = new Paciente();
    this.pacienteForm.patchValue(this.pacienteSelecionado);
  }

  voltar() {
    // this.pacienteSelecionado = null;
  }
}
