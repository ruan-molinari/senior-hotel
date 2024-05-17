import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ValidationErrors, Validators } from '@angular/forms';
import { PessoaService } from '../../../core/services/pessoa.service';
import { CommonModule } from '@angular/common';
import { Select2Data, Select2Module, Select2Option, Select2SearchEvent, Select2UpdateValue } from 'ng-select2-component';
import { NgxMaskDirective } from 'ngx-mask';
import { CheckInService } from '../../../core/services/check-in.service';
import { CheckIn } from '../../../shared/models/check-in';
import { Pessoa } from '../../../shared/models/pessoa';

@Component({
  selector: 'app-novo-check-in',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Select2Module,
    NgxMaskDirective,
  ],
  templateUrl: './novo-check-in.component.html',
  styleUrls: ['./novo-check-in.component.scss', '../check-in.component.scss']
})
export class NovoCheckInComponent implements OnInit {

  pessoas!: Select2Data;

  checkInFormGroup = new FormGroup({
    pessoa: new FormControl({}, Validators.required),
    dataEntrada: new FormControl('', [Validators.required]),
    dataSaida: new FormControl('', [Validators.required]),
    adicionalVeiculo: new FormControl<boolean>(false)
  }, DataCheckInValidator)

  get f(): { [key: string]: AbstractControl } {
    return this.checkInFormGroup.controls;
  }

  constructor(private pessoaService: PessoaService, private checkInService: CheckInService) {}

  ngOnInit(): void {
    this.fetchPessoas();
  }

  fetchPessoas() {
    this.pessoaService.getAll().subscribe(pessoas => {
      this.pessoas = pessoas.map(pessoa => {
        return {
          value: pessoa,
          label: pessoa.nome,
          data: pessoa
        };
      });
    })
  }

  buscarPessoa(ev: Select2SearchEvent<Select2UpdateValue>) {
    ev.filteredData(
      ev.search
        ? ev.data.filter(
          pessoa => pessoa.data.nome.toLowerCase().includes(ev.search)
                 || pessoa.data.CPF.toLowerCase().includes(ev.search)
                 || pessoa.data.telefone.toLowerCase().includes(ev.search))
        : ev.data
    )
  }

  onSubmit() {
    this.checkInFormGroup.markAllAsTouched;
    if (this.checkInFormGroup.valid) {
      let checkIn: CheckIn = {
        dataEntrada: (new Date(this.checkInFormGroup.get('dataEntrada')?.value!).toISOString()),
        dataSaida: (new Date(this.checkInFormGroup.get('dataSaida')?.value!).toISOString()),
        pessoa: this.checkInFormGroup.get('pessoa')?.value! as Pessoa,
        adicionalVeiculo: this.checkInFormGroup.get('adicionalVeiculo')?.value!
      }
      this.checkInService.save(checkIn).subscribe(res => console.log(res));
    }
  }
}

function DataCheckInValidator(group: AbstractControl): ValidationErrors | null {
  const entradaCtrl = group.get('dataEntrada');
  const saidaCtrl = group.get('dataSaida')

  return new Date(entradaCtrl?.value) > new Date(saidaCtrl?.value) ? { saidaAntesDeEntrada: true } : null;
}
