import { Component, EventEmitter, Output, forwardRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { PessoaService } from '../../../core/services/pessoa.service';
import { Pessoa } from '../../../shared/models/pessoa';
import { CommonModule } from '@angular/common';
import { cpf } from 'cpf-cnpj-validator';

@Component({
  selector: 'app-nova-pessoa',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './nova-pessoa.component.html',
  styleUrl: './nova-pessoa.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NovaPessoaComponent),
      multi: true
    }
  ]
})
export class NovaPessoaComponent {

  @Output() onFormComplete = new EventEmitter();

  pessoaForm = new FormGroup({
    nome: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    CPF: new FormControl<string>('', [Validators.required, ValidarCpf]),
    telefone: new FormControl<string>('', [Validators.required, Validators.pattern('[- +()0-9]{8,}')]),
  });

  get f(): { [key: string]: AbstractControl } {
    return this.pessoaForm.controls;
  }

  constructor(private pessoaService: PessoaService) {}

  onSubmit() {
    this.pessoaForm.markAllAsTouched();
    if (this.pessoaForm.valid) {
      let pessoa: Pessoa = {
        nome: this.pessoaForm.get('nome')?.value!,
        CPF: this.pessoaForm.get('CPF')?.value!,
        telefone: this.pessoaForm.get('telefone')?.value!,
      }
      this.pessoaService.save(pessoa).subscribe(res => console.log(res))
      console.log(pessoa)
    }
  }
}

function ValidarCpf(control: AbstractControl): {[key: string]: any} | null  {
  if (control.value && !cpf.isValid(control.value)) {
    return { cpfInvalido: true }
  }
  return null
}
