import { Component } from '@angular/core';
import { ConsultaService } from '../services/consulta.service';
import { Consulta } from '../models/Consulta';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Genero, GeneroToLabelMapping } from '../models/enum/Genero.enum';
import { TipoSanguineo, TipoSanguineoToLabelMapping } from '../models/enum/TipoSanguineo.enum';
import { TipoConsulta, TipoConsultaToLabelMapping } from '../models/enum/TipoConsulta.enum';
import { Sintoma } from '../models/Sintoma';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent {
  titulo = 'Consultas';

  consultas: Consulta[] = [];
  sintomas: Sintoma[] = [];
  public consultaForm: FormGroup;
  public consultaSelecionado: Consulta;

  public modo = 'post';

  generoSelecionado = 'null';
  public generos = Object.values(Genero).filter(value => typeof value === 'number');
  public GeneroToLabelMapping = GeneroToLabelMapping;

  tipoSanguineoSelecionado = 'null';
  public tipoSanguineo = Object.values(TipoSanguineo).filter(value => typeof value === 'number');
  public TipoSanguineoToLabelMapping = TipoSanguineoToLabelMapping;

  TipoConsultaSelecionado = 'null';
  public tipoConsulta = Object.values(TipoConsulta).filter(value => typeof value === 'number');
  public TipoConsultaToLabelMapping = TipoConsultaToLabelMapping;

  constructor(
    private fb: FormBuilder,
    private ConsultaService: ConsultaService){
    this.criarForm();
  }

  ngOnInit(): void {
    this.getConsultas();
  }

  getConsultas() {
    this.ConsultaService.getConsulta().subscribe((consultas: Consulta[]) => {
      this.consultas = consultas;
    })
  }

  criarForm() {
    this.consultaForm = this.fb.group({
      id: [''],
      tipoConsulta: [''],
      descricao: [''],
      data: [''],
      medicoCRM: [{value: '', disabled: true}],
      especializacao: [{value: '', disabled: true}],
      medicoNome: [{value: '', disabled: true}],
      medicoNomeSocial: [{value: '', disabled: true}],
      pacienteId: [{value: '', disabled: true}],
      nome: [{value: '', disabled: true}],
      nomeSocial: [{value: '', disabled: true}],
      cpf: [{value: '', disabled: true}],
      dataNascimento: [{value: '', disabled: true}],
      email: [{value: '', disabled: true}],
      telefone: [{value: '', disabled: true}],
      tipoSanguineo: [{value: '', disabled: true}],
      genero: [{value: '', disabled: true}],
      sintomas: {
        sintomaId: [''],
        nome: [''],
      }
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
    console.log(consulta);
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
