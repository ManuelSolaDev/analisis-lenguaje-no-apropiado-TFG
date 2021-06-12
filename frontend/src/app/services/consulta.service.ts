import { Injectable } from '@angular/core';
import { Consulta } from '../models/consulta.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  constructor(private http: HttpClient) { }

  nuevaConsulta(data: Consulta){

    console.log(data);
    return this.http.post(`${environment.base_url}/consultas/`, data);
  }

  cargarConsultas(){
    return this.http.get(environment.base_url + '/consultas/');
  }



  cargarConsulta(uid: string) { //para la página de editar/crear evento
    if (!uid) {uid = ''; }
    return this.http.get(environment.base_url + '/consultas/?id=' + uid);
  }
}
