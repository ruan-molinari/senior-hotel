import { Component, OnInit } from '@angular/core';
import { PessoaHospede } from '../../../shared/models/pessoa';
import { CheckInService } from '../../../core/services/check-in.service';
import { CheckIn } from '../../../shared/models/check-in';
import { Observable, firstValueFrom, from, map, toArray } from 'rxjs';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { PaginaPipe } from '../../../shared/pipes/pagina.pipe';

import { GlobalConstants } from '../../../shared/global-constants';
import { FormsModule } from '@angular/forms';

const diaria = GlobalConstants.diaria;
const diariaFimDeSemana = GlobalConstants.diariaFimDeSemana;
const diariaGaragem = GlobalConstants.diariaGaragem;
const diariaGaragemFimDeSemana = GlobalConstants.diariaGaragemFimDeSemana;

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [CurrencyPipe, PaginaPipe, FormsModule],
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.scss'
})
export class ConsultasComponent implements OnInit {

  pagina = 0;
  aindaPresentes = false;
  hospedes: PessoaHospede[] = [];

  constructor(private checkInService: CheckInService) {}

  ngOnInit() {
    this.buscarHospedagens();
  }

  buscarHospedagens() {
    this.checkInService.getByDate(this.aindaPresentes).subscribe(res => {
      from(res)
        .pipe(
          map<CheckIn, PessoaHospede>(hospedagem => {
            return {
              ...hospedagem.pessoa,
              valorEstadia: this.calcularHospedagem(hospedagem)
            }
          }),
          toArray()).subscribe(result => this.hospedes = result)
    });
  }

  mudarPagina(proxima: boolean) {
    if (proxima) {
      if (this.hospedes.length % 5 > 0
       && this.hospedes.length > (this.pagina + 1) * 5
      ) {
        this.pagina++
      }
    } else if (this.pagina > 0) this.pagina--;
  }

  calcularHospedagem(checkIn: CheckIn) {
    let entrada = new Date(checkIn.dataEntrada);
    let saida = new Date(checkIn.dataSaida);

    let total = 0;

    let data = entrada

    while (data.getDate() <= saida.getDate()) {
      total += this.calcularDiaria(data, checkIn.adicionalVeiculo);

      console.log(data)
      data = this.adicionarDias(data, 1)
    }

    if (saida.getHours() > 16 || (saida.getHours() == 16 && saida.getMinutes() >= 30)) {
      total += this.calcularDiaria(data, checkIn.adicionalVeiculo)
    }

    return total;
  }

  calcularDiaria(data: Date, adicionalVeiculo: boolean) {
    let total = 0;

    if (data.getDay() == 0 || data.getDay() == 6) {
      total += diariaFimDeSemana;

      if (adicionalVeiculo) total += diariaGaragemFimDeSemana;
    } else {
      total += diaria;

      if (adicionalVeiculo) total += diariaGaragem;
    }

    return total;
  }

  adicionarDias(data: Date, dias: number) {
    var result = new Date(data.toString());
    result.setDate(result.getDate() + dias);
    return result;
  }
}
