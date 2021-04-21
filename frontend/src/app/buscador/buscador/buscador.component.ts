import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConsultaService } from '../../services/consulta.service';
import { Consulta } from '../../models/consulta.model';


@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  public formConsulta = this.fb.group({
    terminos: [ '', Validators.required],
    fechaDesde: ['', Validators.required ],
    fechaHasta: ['', Validators.required ],

  });

  constructor(private fb: FormBuilder,
              private consultaService: ConsultaService) { }

  ngOnInit(): void {
  }

  realizarConsulta(){
    console.log("Realizar consulta");

    //separamos los terminos
    let terminos = this.formConsulta.value.terminos;
    terminos = terminos.split(' ');

    const consulta: Consulta = {
      terminos: terminos,
      fechaDesde: this.formConsulta.value.fechaDesde,
      fechaHasta: this.formConsulta.value.fechaHasta

    };

    this.consultaService.nuevaConsulta(consulta).subscribe( res =>{
      console.log(res);
    });
  }

    //Para cuando un campo no es correcto
    /*campoNoValido( campo: string) {
      return this.formConsulta.get(campo).invalid;
    }*/

}
