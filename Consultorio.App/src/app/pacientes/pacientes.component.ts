import { Component, OnInit } from '@angular/core';
import { Paciente } from '../models/Paciente';
import { PacienteService } from '../services/paciente.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Genero, GeneroToLabelMapping } from '../models/enum/Genero.enum';
import { TipoSanguineoToLabelMapping, TipoSanguineo } from '../models/enum/TipoSanguineo.enum';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.scss'
})

export class PacientesComponent implements OnInit {
  titulo = 'Pacientes';

  public pacienteSelecionado: Paciente;
  public pacienteForm: FormGroup;
  public pacientes: Paciente[];
  public modo = 'post';
  public GeneroToLabelMapping = GeneroToLabelMapping;
  public generos = Object.values(Genero).filter(value => typeof value === 'number');
  public TipoSanguineoToLabelMapping = TipoSanguineoToLabelMapping;
  public tipoSanguineo = Object.values(TipoSanguineo).filter(value => typeof value === 'number');
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  generoSelecionado = 'null';
  tipoSanguineoSelecionado = 'null';

  constructor(
    private fb: FormBuilder,
    private PacienteService: PacienteService
    ){
    this.criarForm();
  }

  ngOnInit(): void {
    this.getPacientes();
  }

  getPacientes() {
    this.PacienteService.getPaciente().subscribe({
      next: (pacientes: Paciente[]) => {
      this.pacientes = pacientes;
      },
      error: (error) => {
        console.log(error);
      },
    })
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
      tipoSanguineo: [, Validators.required],
      genero: [, Validators.required],
      cep: [''],
      bairro: [''],
      endereco: [''],
      telefone: [''],
      observacao: [''],
    });
  }

  savePaciente(paciente: Paciente) {
    (paciente.id === undefined || paciente.id === 0) ? (this.modo = 'post') : (this.modo = 'put');

      this.PacienteService[this.modo](paciente).subscribe({
        next: (retorno: Paciente) => {
          this.getPacientes();
          this.pacienteSelecionado = null;
        },
        error: (error: any) => {
          console.log(error);
        },});
    }

  pacienteSubmit() {
    this.savePaciente(this.pacienteForm.value);
  }

  editPaciente(paciente: Paciente) {
    this.pacienteSelecionado = { ...paciente };
  }

  pacienteSelect(paciente: Paciente) {
    this.pacienteSelecionado = paciente;
    console.log(paciente);
    this.pacienteForm.patchValue(paciente);
  }

  pacienteNovo() {
    this.pacienteSelecionado = new Paciente();
    this.pacienteForm.patchValue(this.pacienteSelecionado);
  }

  voltar() {
    this.pacienteSelecionado = null;
  }
}
