import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SintomaService } from '../../../services/sintoma.service';
import { ActivatedRoute } from '@angular/router';
import { Sintoma } from '../model/sintoma';
import { FormUtilsService } from '../../../shared/form/form-utils.service';

@Component({
  selector: 'app-sintoma-form',
  templateUrl: './sintoma-form.component.html',
  styleUrl: './sintoma-form.component.scss',
})
export class SintomaFormComponent implements OnInit {
  titulo: string;

  setTitle() {
    if (this.form.value.id === 0) {
      this.titulo = 'Novo sintoma';
    } else {
      this.titulo = 'Editar sintoma: ' + this.form.value.id;
    }
  }

  form: FormGroup;

  constructor(
    private _formBuider: FormBuilder,
    private _sintomaService: SintomaService,
    private _location: Location,
    private _route: ActivatedRoute,
    public formUtils: FormUtilsService
  ) {}

  ngOnInit(): void {
    const sintoma: Sintoma = this._route.snapshot.data['sintoma'];
    this.form = this._formBuider.group({
      id: [sintoma.id],
      nome: [
        sintoma.nome,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
    });
    this.setTitle();
  }

  onSubmit() {
    if (this.form.valid) {
      this._sintomaService.save(this.form.value).subscribe({
        next: () => {
          this.formUtils.message('Sintoma cadastrado com sucesso!');
          this.voltar();
        },
        error: () => this.formUtils.message('Erro ao cadastrar sintoma!'),
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
