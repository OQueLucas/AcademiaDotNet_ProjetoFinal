import { Component, OnInit } from '@angular/core';
import { Medico } from '../models/Medico';
import { MedicoService } from '../services/medico.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrl: './medicos.component.scss'
})
export class MedicosComponent implements OnInit {
  title = 'Medicos';
  medico = {} as Medico;
  medicos: Medico[] = [];

  constructor(private MedicoService: MedicoService){}

  ngOnInit(): void {
    this.getMedicos();
  }

  getMedicos() {
    this.MedicoService.getMedico().subscribe((medicos: Medico[]) => {
      this.medicos = medicos;
    })
  }

  saveMedico(form: NgForm) {
    if (this.medico.id !== undefined) {
      this.MedicoService.updateMedico(this.medico).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.MedicoService.saveMedico(this.medico).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  editMedico(medico: Medico) {
    this.medico = { ...medico };
  }

  cleanForm(form: NgForm) {
    this.getMedicos();
    form.resetForm();
    this.medico = {} as Medico;
  }
}
