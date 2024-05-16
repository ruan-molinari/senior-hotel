import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { cpf } from 'cpf-cnpj-validator';

@Directive({
  selector: '[cpfValidator]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useClass: CpfValidatorDirective,
      multi: true
    }
  ]
})
export class CpfValidatorDirective implements Validator {

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if (control.value && !cpf.isValid(control.value)) {
      return { cpf: { error: 'cpfInvalid' } }
    }
    return null
  }

}
