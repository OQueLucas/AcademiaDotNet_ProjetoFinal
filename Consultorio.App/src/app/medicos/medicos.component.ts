import { Component, OnInit } from '@angular/core';
import { Medico } from '../models/Medico';
import { MedicoService } from '../services/medico.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { TipoSanguineo, TipoSanguineoToLabelMapping } from '../models/enum/TipoSanguineo.enum';
import { Genero, GeneroToLabelMapping } from '../models/enum/Genero.enum';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrl: './medicos.component.scss'
})
export class MedicosComponent implements OnInit {
  titulo = 'Medicos';

  public medicos: Medico[] = [];
  public medicoForm: FormGroup;
  public medicoSelecionado: Medico;

  public modo = 'post';

  generoSelecionado = 'null';
  public generos = Object.values(Genero).filter(value => typeof value === 'number');
  public GeneroToLabelMapping = GeneroToLabelMapping;

  tipoSanguineoSelecionado = 'null';
  public tipoSanguineo = Object.values(TipoSanguineo).filter(value => typeof value === 'number');
  public TipoSanguineoToLabelMapping = TipoSanguineoToLabelMapping;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private fb: FormBuilder,
    private MedicoService: MedicoService
    ){
      this.criarForm();
    }

  ngOnInit(): void {
    this.getMedicos();
  }

  getMedicos() {
    this.MedicoService.getMedico().subscribe((medicos: Medico[]) => {
      this.medicos = medicos;
    })
  }

  getSintomas(){

  }

  criarForm() {
    this.medicoForm = this.fb.group({
      id: [''],
      pessoaId: [''],
      crm: ['', Validators.required],
      especializacao: ['', Validators.required],
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
    });
  }

  saveMedico(medico: Medico) {
      medico.id === 0 ? (this.modo = 'post') : (this.modo = 'put');

      this.MedicoService[this.modo](medico).subscribe((retorno: Medico) => {
        this.getMedicos();
        this.medicoSelecionado = retorno;
      });
  }

  medicoSubmit() {
    this.saveMedico(this.medicoForm.value);
  }

  medicoSelect(medico: Medico) {
    this.medicoSelecionado = medico;
    console.log(medico);
    this.medicoForm.patchValue(medico);
  }

  medicoNovo() {
    this.medicoSelecionado = new Medico();
    this.medicoForm.patchValue(this.medicoSelecionado);
  }

  voltar() {
    this.medicoSelecionado = null;
  }
}
