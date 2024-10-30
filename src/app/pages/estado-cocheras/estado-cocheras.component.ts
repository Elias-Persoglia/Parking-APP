import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cochera } from '../../interfaces/cochera';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-estado-cocheras',
  standalone: true,
  imports: [RouterModule, CommonModule, HeaderComponent],
  templateUrl: './estado-cocheras.component.html',
  styleUrl: './estado-cocheras.component.scss'
})



export class EstadoCocherasComponent {
  titulo = "PARKING APP";
  header: { nro: string, disponibilidad: string, ingreso: string, acciones: string } = {
  nro :"N°",
  disponibilidad : "Disponibilidad",
  ingreso : "Ingreso",
  acciones : "Acciones",
};

SiguienteNumero = 0
  
filas: Cochera[] = []

auth = inject(AuthService)

ngOnInit() {
  this.traerCocheras().then(cocheras => {
    this.filas = cocheras;
  });
}

traerCocheras(){
  return fetch('http://localhost:4200/cocheras', {
    method: 'GET',
    headers: {
      authorization: "Bearer" + this.auth.getToken() 
    },
  }).then(response => response.json())
}

agregarFila() {
  this.filas.push({
    disponibilidad: true,
    id: this.SiguienteNumero,
    descripcion: '',
    deshabilitada: false,
    eliminada: false,
  });
  this.SiguienteNumero += 1;
}


eliminarFila(numeroFila:number){
  fetch('http://localhost:4200/estado-cocheras/' + numeroFila, {
    method: 'DELETE',
    headers: {
      Authorization: ' Bearer ' + this.auth.getToken(),
    },
  }).then(() => {
    this.traerCocheras().then((filas) => {
      this.filas = filas;
    });
  });
}


cambiarDisponibilidadCochera(numeroFila:number){
  if(this.filas[numeroFila].disponibilidad === true){
    this.filas[numeroFila].disponibilidad = false;    
  } else{
      this.filas[numeroFila].disponibilidad = true;
    }  
}

getCocheras(){
  fetch("http://localhost:4200/cocheras", {
    headers:{
      authorization : 'Bearer ey'
    },
  });
}
}



