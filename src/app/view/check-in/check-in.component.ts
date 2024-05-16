import { Component } from '@angular/core';
import { NovoCheckInComponent } from './novo-check-in/novo-check-in.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { NovaPessoaComponent } from '../pessoa/nova-pessoa/nova-pessoa.component';

@Component({
  selector: 'app-check-in',
  standalone: true,
  imports: [NovoCheckInComponent, ConsultasComponent, NovaPessoaComponent],
  templateUrl: './check-in.component.html',
  styleUrl: './check-in.component.scss'
})
export class CheckInComponent {

}
