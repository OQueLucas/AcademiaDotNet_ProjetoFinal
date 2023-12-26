import { Component, OnInit } from '@angular/core';
import { Sintoma } from '../models/sintoma';
import { SintomaService } from '../services/sintoma.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sintoma',
  templateUrl: './sintoma.component.html',
  styleUrl: './sintoma.component.scss'
})
export class SintomaComponent implements OnInit {
  title = 'Sintomas';
  sintoma = {} as Sintoma;
  sintomas: Sintoma[] = [];

  constructor(private SintomaService: SintomaService){}

  ngOnInit(): void {
    this.getSintomas();
  }

  getSintomas() {
    this.SintomaService.getSintoma().subscribe((sintoma: Sintoma[]) => {
      this.sintomas = sintoma;
    })
  }

  saveSintoma(form: NgForm) {
    if (this.sintoma.id !== undefined) {
      this.SintomaService.updateSintoma(this.sintoma).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.SintomaService.saveSintoma(this.sintoma).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  deleteSintoma(sintoma: Sintoma) {
    this.SintomaService.deleteSintoma(sintoma).subscribe(() => {
      this.getSintomas();
    });
  }

  editSintoma(sintoma: Sintoma) {
    this.sintoma = { ...sintoma };
  }

  cleanForm(form: NgForm) {
    this.getSintomas();
    form.resetForm();
    this.sintoma = {} as Sintoma;
  }
}
