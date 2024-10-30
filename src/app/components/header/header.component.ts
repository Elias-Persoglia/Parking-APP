import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  esAdmin:boolean = false;
  auth = inject(AuthService);
  resultadoInput: any;

  abrirModal() {
    Swal.fire({
      title: "Enter your IP address",
      input: "text",
      inputLabel: "Your IP address",
      inputValue: "",
      showCancelButton: true,
    }).then((result) => {
      this.resultadoInput = result.value;
    });
  }
}
