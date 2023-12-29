import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PacienteService } from '../../services/paciente.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Paciente } from '../models/Paciente';
import { Location } from '@angular/common';
import { Genero, GeneroToLabelMapping } from '../../models/enum/Genero.enum';
import {
  TipoSanguineo,
  TipoSanguineoToLabelMapping,
} from '../../models/enum/TipoSanguineo.enum';

@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrl: './paciente-form.component.scss',
})
export class PacienteFormComponent {
  titulo: string;

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

  form = this._formBuider.group({
    id: [0],
    nome: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(100)],
    ],
    pessoaId: [0],
    nomeSocial: ['', [Validators.minLength(4), Validators.maxLength(30)]],
    cpf: [
      '',
      [Validators.required, Validators.minLength(11), Validators.maxLength(14)],
    ],
    dataNascimento: [new Date(), Validators.required],
    email: ['', [Validators.email]],
    tipoSanguineo: [0, Validators.required],
    genero: [0, Validators.required],
    cep: ['', [Validators.minLength(8), Validators.maxLength(8)]],
    bairro: ['', [Validators.minLength(5), Validators.maxLength(30)]],
    endereco: ['', [Validators.minLength(8), Validators.maxLength(60)]],
    telefone: ['', [Validators.minLength(10), Validators.maxLength(11)]],
    observacao: [''],
  });

  constructor(
    private _formBuider: FormBuilder,
    private _pacienteService: PacienteService,
    private _location: Location,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const paciente: Paciente = this._route.snapshot.data['paciente'];
    this.form.setValue({
      id: paciente.id,
      nome: paciente.nome,
      pessoaId: paciente.pessoaId,
      nomeSocial: paciente.nomeSocial,
      cpf: paciente.cpf,
      dataNascimento: paciente.dataNascimento,
      email: paciente.email,
      tipoSanguineo: paciente.tipoSanguineo,
      genero: paciente.genero,
      cep: paciente.cep,
      bairro: paciente.bairro,
      endereco: paciente.endereco,
      telefone: paciente.telefone,
      observacao: paciente.observacao,
    });
    this.setTitle();
  }

  onSubmit() {
    this._pacienteService.save(this.form.value).subscribe({
      next: () => {
        this.onSuccess();
        this.voltar();
      },
      error: () => this.onError(),
    });
  }

  onCancel(): void {
    this.voltar();
  }

  voltar() {
    this._location.back();
    // this.router.navigate(['pacientes']);
  }

  private onSuccess() {
    this._snackBar.open('Paciente salvo com sucesso!', '', { duration: 5000 });
  }

  private onError() {
    this._snackBar.open('Erro ao salvar paciente!', '', { duration: 5000 });
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if (field.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (field.hasError('minlength')) {
      const requiredLength = field.errors
        ? field.errors['minlength']['requiredLength']
        : 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres`;
    }

    if (field.hasError('maxlength')) {
      const requiredLength = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 30;
      return `Tamanho máximo precisa ser de ${requiredLength} caracteres`;
    }

    if (field.hasError('email')) {
      return `Insira um email válido`;
    }

    return 'Campo inválido';
  }
}
