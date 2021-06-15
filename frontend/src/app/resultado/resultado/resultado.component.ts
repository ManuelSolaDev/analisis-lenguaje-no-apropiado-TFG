declare var require: any
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsultaService } from '../../services/consulta.service';
import Swal from 'sweetalert2'
const interpolate = require('color-interpolate');
declare const vis: any;

import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Filler,
  Legend,
  Title,
  Tooltip
} from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Filler,
  Legend,
  Title,
  Tooltip
);


@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {

  public consulta = null;
  public chart2: any = null;
  public chart3: any = null;

  //porcentajes de insultos leves, medios y graves
  public porcentajes = [0, 0, 0]

  constructor( private route: ActivatedRoute, private consultaService: ConsultaService) { }

  ngOnInit(): void {

    // Called when the Visualization API is loaded.

    /********************************************************************** */



    /*const canvas2 = <HTMLCanvasElement> document.getElementById('myChartNivelLenguajeInapropiado');
    const ctx2 = canvas2.getContext('2d');*/

    const canvas3 = <HTMLCanvasElement> document.getElementById('myChartUltimosDias');
    const ctx3 = canvas3.getContext('2d');





    this.chart3 = new Chart(ctx3, {
      type: 'bar',
      data: {
          labels: ['@Mike2', '@GoikoSanx', '@PeixLoader', '@HomerLike', '@SalvaLorenzo', '@LucasModrik'],
          datasets: [{
              label: 'Insultos en los últimos 6 días',
              data: [100, 90, 85, 70, 30, 10],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
    });


    canvas3.style.height='300px';
    canvas3.style.width='300px';


    this.route.paramMap.subscribe(params => {
      let idConsulta = this.route.snapshot.params['idConsulta'];
      this.consultaService.cargarConsulta(idConsulta)
      .subscribe(res => {
        if(!res['consultas']){
            Swal.fire({icon: 'error', title: 'Oops...', text: 'No se pudo completar la acción, vuelva a intentarlo', });
            return;
        } else {
          //Aqui entra
          let nodes = drawNetwork(res['consultas']);

          drawMayoresInstigadores(nodes);

          calculaPorcentajesInsultos(nodes, this.porcentajes);

          console.log("Ha cogido la consulta");
          console.log(res['consultas']);
          this.consulta = res['consultas'];
        }
      }, (err) => {
        Swal.fire({icon: 'error', title: 'Oops...', text: 'No se pudo completar la acción, vuelva a intentarlo', });
        return;
      });
    });

  }
}

/************************************************************************************** */
function calculaPorcentajesInsultos(nodes, porcentajes){
  for(let i = 0; i < nodes.length; i++){
    if(nodes[i].mediaPrediccion !== undefined){
      if(nodes[i].mediaPrediccion<0.33){
        porcentajes[0]++;
      }else{
        if(nodes[i].mediaPrediccion<0.66){
          porcentajes[1]++;
        }else{
          porcentajes[2]++;
        }
      }
    }

  }
  const sum = porcentajes[0]+ porcentajes[1] +porcentajes[2];
  porcentajes[0] = (porcentajes[0] *100 / sum).toFixed(2);
  porcentajes[1] = (porcentajes[1] *100 / sum).toFixed(2);
  porcentajes[2] = (porcentajes[2] *100 / sum).toFixed(2);


}
/***************************************************************************************** */

function drawMayoresInstigadores(nodes){
  const canvas = <HTMLCanvasElement> document.getElementById('myChartInstigadoresOdio');
  const ctx = canvas.getContext('2d');

  function compare( a, b ) {
    if(a.mediaPrediccion == undefined){
      a.mediaPrediccion = 0;
    }
    if(b.mediaPrediccion == undefined){
      b.mediaPrediccion = 0;
    }
    if ( a.mediaPrediccion > b.mediaPrediccion ){
      return -1;
    }
    if ( a.mediaPrediccion < b.mediaPrediccion ){
      return 1;
    }
    return 0;
  }

  //ordenamos los nodos por su media de prediccion, lo ideal seria tmbn ponderar por value
  nodes = nodes.sort( compare );

  //cogemos los 5 primeros que son los que tienen la prediccion mas alta
  let labels = [];
  let backgroundColor = [];
  let values = [];
  let colormap = interpolate(['green', 'red']);

  for( let i=0; i<5; i++){
    labels.push(nodes[i].id);
    backgroundColor.push(colormap(nodes[i].mediaPrediccion))
    values.push(nodes[i].mediaPrediccion)
  }

  console.log("nodes ordenados");
  console.log(nodes)


  let chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Usuarios instigadores del odio',
            data: values,
            backgroundColor: backgroundColor,
            borderColor: backgroundColor,
            borderWidth: 1
        }]
    },
    options: {
        indexAxis: 'y',
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
  });

  canvas.style.height='300px';
  canvas.style.width='300px';
}


/*********************************************************************************** */

function drawNetwork(datos) {


  var nodes = [];
  var edges = [];
  var network = null;

  let colormap = interpolate(['red', 'blue', 'green']);
  let red = colormap(0);
  let blue = colormap(1);
  let green = colormap(2);


  for( let i = 0; i < datos['resultado'].length; i++){

    let idxNodo = nodes.findIndex( nodo => nodo.id == datos['resultado'][i]['nombre']);

    if(idxNodo !== -1){ //si ya existe
      nodes[idxNodo].value++;

      //comprobamos que el nodo no sea uno creado de receptor que no tiene prediccion
      if(nodes[idxNodo].sumaPredicciones !== undefined){
        nodes[idxNodo].sumaPredicciones = nodes[idxNodo].sumaPredicciones + parseFloat(datos['resultado'][i]['prediccion']);
        nodes[idxNodo].mediaPrediccion = nodes[idxNodo].sumaPredicciones / nodes[idxNodo].value;
        nodes[idxNodo].color = colormap(nodes[idxNodo].mediaPrediccion);
      }


    }else{ //si no existia
      let image = datos['resultado'][i]['foto'];
        if(image == undefined){
          image = '../../../assets/img/no-user-image.jpg';
        }
      nodes.push({
        id: datos['resultado'][i]['nombre'],
        shape: "circularImage",
        image: image,
        value: 1,
        url: datos['resultado'][i]['url_usu'],
        label: datos['resultado'][i]['nombre'],
        mediaPrediccion: parseFloat(datos['resultado'][i]['prediccion']),
        sumaPredicciones: parseFloat(datos['resultado'][i]['prediccion']),
        color: colormap(parseFloat(datos['resultado'][i]['prediccion']))
      });


    }

    //ahora asignamos el color en funcion de la media de predicciones
    if(idxNodo == -1){
      idxNodo = nodes.length-1;
    }





    //ahora lo mismo para los receptores
    for(let j = 0; j < datos['resultado'][i]['receptores'].length; j++){

      //hacemos el split porque ahi tenemos el nombre y la foto separados por un espacio
      let idxNodo = nodes.findIndex( nodo => nodo.id == datos['resultado'][i]['receptores'][j].split(' ')[0]);

      if(idxNodo !== -1){ //si ya existe

        nodes[idxNodo].value++;

      }else{ //si no existia
        //los receptores no tienen prediccion porque non han twitteado nada
        let image = datos['resultado'][i]['receptores'][j].split(' ')[1];
        if(image == undefined){
          image = '../../../assets/img/no-user-image.jpg';
        }
        nodes.push({
          id: datos['resultado'][i]['receptores'][j].split(' ')[0],
          shape: "circularImage",
          image: image,
          value: 1,
          url: 'http://www.google.com',
          label: datos['resultado'][i]['receptores'][j].split(' ')[0]
        });

      }
    }

  }

  //Ahora creamos los edges/uniones entre nodos

  for( let i = 0; i < datos['resultado'].length; i++){
    for(let j = 0; j < datos['resultado'][i]['receptores'].length; j++){

      const idxEdge = edges.findIndex( edge => edge.from == datos['resultado'][i]['nombre'] && edge.to == datos['resultado'][i]['receptores'][j].split(' ')[0]);

      if(idxEdge !== -1){ //si ya existe

        edges[idxEdge].value++;
        edges[idxEdge].sumaPredicciones += parseFloat(datos['resultado'][i]['prediccion']);
        console.log(edges[idxEdge].sumaPredicciones + ', ' + edges[idxEdge].value);
        edges[idxEdge].mediaPrediccion = edges[idxEdge].sumaPredicciones / edges[idxEdge].value;
        edges[idxEdge].color = colormap(edges[idxEdge].mediaPrediccion);


      }else{ //si no existia

        edges.push({
          from: datos['resultado'][i]['nombre'],
          to: datos['resultado'][i]['receptores'][j].split(' ')[0],
          value: 1,
          mediaPrediccion: parseFloat(datos['resultado'][i]['prediccion']),
          sumaPredicciones: parseFloat(datos['resultado'][i]['prediccion']),
          color: colormap(parseFloat(datos['resultado'][i]['prediccion']))
        });

      }
    }
  }
  console.log("nodes");
  console.log(nodes);
  var nodesTipados = new vis.DataSet(nodes);


  // create a network
  var container = document.getElementById("mynetwork");
  var data = {
    nodes: nodesTipados,
    edges: edges,
  };
  var options = {
    nodes: {
      scaling: {
        customScalingFunction: function (min, max, total, value) {
          return value / total;
        },
        min: 5,
        max: 150,
      },
      borderWidth: 4,
      size: 30,
      color: {
        border: "#222222",
        background: "#666666",
      },
      font: { color: "#000" },
    },
    edges: {
      color: "lightgray",
    },
  };
  network = new vis.Network(container, data, options);

  network.on("selectNode", function (params) {
    if (params.nodes.length === 1) {
        var node = nodesTipados.get(params.nodes[0]);
        window.open(node.url, '_blank');
    }
  });

  return nodes;
}

