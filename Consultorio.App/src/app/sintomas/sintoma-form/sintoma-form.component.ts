import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

import { SintomaService } from '../../services/sintoma.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sintoma } from '../model/sintoma';

// type AlertType = { type: string; msg: string };

@Component({
  selector: 'app-sintoma-form',
  templateUrl: './sintoma-form.component.html',
  styleUrl: './sintoma-form.component.scss',
})
export class SintomaFormComponent implements OnInit {
  titulo = '';

  form = this._formBuider.group({
    id: [0],
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
  });

  constructor(
    private _formBuider: FormBuilder,
    private _sintomaService: SintomaService,
    private _location: Location,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const sintoma: Sintoma = this._route.snapshot.data['sintoma'];
    // this.form.setValue(sintoma);
    this.form.setValue({ id: sintoma.id, nome: sintoma.nome });
  }

  onSubmit() {
    this._sintomaService.save(this.form.value).subscribe({
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
    // this.router.navigate(['sintomas']);
  }

  private onSuccess() {
    this._snackBar.open('Sintoma salvo com sucesso!', '', { duration: 5000 });
  }

  private onError() {
    this._snackBar.open('Erro ao salvar sintoma!', '', { duration: 5000 });
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

    return 'Campo inválido';
  }
}
