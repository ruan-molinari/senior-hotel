import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Pessoa } from '../../../shared/models/pessoa';
import { PessoaService } from '../../../core/services/pessoa.service';
import { Observable, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

//import $ from 'jquery';
declare var $: any;

@Component({
  selector: 'app-novo-check-in',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './novo-check-in.component.html',
  styleUrls: ['./novo-check-in.component.scss', '../check-in.component.scss']
})
export class NovoCheckInComponent implements OnInit {

  pessoas$?: Observable<Pessoa[]>;
  subject = new Subject<Pessoa[]>();

  filtroPessoa = '';

  constructor(private pessoaService: PessoaService) {}

  ngOnInit(): void {
    this.fetchPessoas();


  }

  checkInFormGroup = new FormGroup({
    pessoa: new FormControl({}, Validators.required),
    dataEntrada: new FormControl<Date>(new Date(), [Validators.required]),
    dataSaida: new FormControl<Date>(new Date(), [Validators.required]),
    adicionalVeiculo: new FormControl<boolean>(false)
  }, DataCheckInValidator)

  fetchPessoas() {
    this.pessoas$ = this.pessoaService.pessoas$;
  }

  onPessoaFilterChange(event: Event) {
    this.pessoaService.buscar((event.target as HTMLInputElement).value)
  }
}

function DataCheckInValidator(group: AbstractControl): ValidationErrors | null {
  const entradaCtrl = group.get('dataEntrada');
  const saidaCtrl = group.get('dataSaida')

  return new Date(entradaCtrl?.value) > new Date(saidaCtrl?.value) ? { saidaAntesDeEntrada: true } : null;
}
