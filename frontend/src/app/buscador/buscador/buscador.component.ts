import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConsultaService } from '../../services/consulta.service';
import { Consulta } from '../../models/consulta.model';
import { Router } from '@angular/router';


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

  private hashRes = '';
  public consultas = [];

  constructor(private fb: FormBuilder,
              private consultaService: ConsultaService,
              private router: Router) { }

  ngOnInit(): void {

    this.consultaService.cargarConsultas().subscribe(res => {
      this.consultas = res['consultas'];

      //recargamos las consultas cada 2 segundos para ver cuando se resuelven
      window.setInterval(this.pulsaBoton, 2000);
    });


  }

  pulsaBoton(): void {
    document.getElementById('botonRefrescar').click();
  }

  refrescarTabla(){
    this.consultaService.cargarConsultas().subscribe(res => {
      this.consultas = res['consultas'];
    });
  }

  verConsulta(id){
    this.router.navigateByUrl('/resultado/' +id.toString());
  }

  realizarConsulta(){

    //separamos los terminos
    let terminos = this.formConsulta.value.terminos;
    terminos = terminos.split(' ');
    const consulta: Consulta = {
      terminos: terminos,
      fechaDesde: this.formConsulta.value.fechaDesde,
      fechaHasta: this.formConsulta.value.fechaHasta
    };

    //guardamos la consulta
    this.consultaService.nuevaConsulta(consulta).subscribe( res =>{

      //cuando se crea la consulta
      console.log("res");
      console.log(res);
      this.consultas.push(res['consulta']);

    });
  }



}
