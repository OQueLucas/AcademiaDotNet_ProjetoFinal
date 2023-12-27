import { Component, OnInit } from '@angular/core';
import { Sintoma } from '../models/Sintoma';
import { SintomaService } from '../services/sintoma.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-sintoma',
  templateUrl: './sintoma.component.html',
  styleUrl: './sintoma.component.scss'
})
export class SintomaComponent implements OnInit {
  titulo = 'Sintomas';

  sintomas: Sintoma[] = [];
  public sintomaForm: FormGroup;
  sintomaSelecionado: Sintoma;

  public modo = 'post';

  constructor(
    private fb: FormBuilder,
    private SintomaService: SintomaService
    ){
      this.criarForm();
    }

  ngOnInit(): void {
    this.getSintomas();
  }

  getSintomas() {
    this.SintomaService.getSintoma().subscribe((sintoma: Sintoma[]) => {
      this.sintomas = sintoma;
    })
  }

  criarForm() {
    this.sintomaForm = this.fb.group({
      id: [''],
      nome: [''],
    });
  }

  saveSintoma(sintoma: Sintoma) {
    sintoma.id === 0 ? (this.modo = 'post') : (this.modo = 'put');

    this.SintomaService[this.modo](sintoma).subscribe((retorno: Sintoma) => {
      this.getSintomas();
      this.sintomaSelecionado = retorno;
    });
  }

  deleteSintoma(sintoma: Sintoma) {
    this.SintomaService.deleteSintoma(sintoma).subscribe(() => {
      this.getSintomas();
    });
  }

  sintomaSubmit() {
    this.saveSintoma(this.sintomaForm.value);
  }

  sintomaSelect(sintoma: Sintoma) {
    this.sintomaSelecionado = sintoma;
    this.sintomaForm.patchValue(sintoma);
  }

  sintomaNovo() {
    this.sintomaSelecionado = new Sintoma();
    this.sintomaForm.patchValue(this.sintomaSelecionado);
  }

  voltar() {
    this.sintomaSelecionado = null;
  }
}
