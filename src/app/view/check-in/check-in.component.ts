import { Component } from '@angular/core';
import { NovoCheckInComponent } from './novo-check-in/novo-check-in.component';
import { ConsultasComponent } from './consultas/consultas.component';

@Component({
  selector: 'app-check-in',
  standalone: true,
  imports: [NovoCheckInComponent, ConsultasComponent],
  templateUrl: './check-in.component.html',
  styleUrl: './check-in.component.scss'
})
export class CheckInComponent {

}
