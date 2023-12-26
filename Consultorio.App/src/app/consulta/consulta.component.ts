import { Component } from '@angular/core';
import { ConsultaService } from '../services/consulta.service';
import { Consulta } from '../models/consulta';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent {
  title = 'Consultas';
  consulta = {} as Consulta;
  consultas: Consulta[] = [];

  constructor(private ConsultaService: ConsultaService){}

  ngOnInit(): void {
    this.getConsultas();
  }

  getConsultas() {
    this.ConsultaService.getConsulta().subscribe((consultas: Consulta[]) => {
      this.consultas = consultas;
    })
  }

  saveConsulta(form: NgForm) {
    if (this.consulta.id !== undefined) {
      this.ConsultaService.updateConsulta(this.consulta).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.ConsultaService.saveConsulta(this.consulta).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // deleteConsulta(consulta: Consulta) {
  //   this.ConsultaService.deleteConsulta(consulta).subscribe(() => {
  //     this.getConsultas();
  //   });
  // }

  editConsulta(consulta: Consulta) {
    this.consulta = { ...consulta };
  }

  cleanForm(form: NgForm) {
    this.getConsultas();
    form.resetForm();
    this.consulta = {} as Consulta;
  }
}
