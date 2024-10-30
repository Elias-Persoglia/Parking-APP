import { Injectable } from '@angular/core';
import { DatosLogin } from '../interfaces/login';
import { Token } from '@angular/compiler';
import { inject } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  
  login(datosLogin: DatosLogin) {
    return fetch('http://localhost:4202/login', {
      method: 'POST',
      body: JSON.stringify(datosLogin),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(r => r.json())
    .then(response => {
      if (response.status === 'ok') {
        localStorage.setItem('token', response.token);
        return true;
      } else {
        return false;
      }
    });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  

  estaLogueado(): boolean{
    if (this.getToken())
      return true;
    else;
      return false;
  }

}

