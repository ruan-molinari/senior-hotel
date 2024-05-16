import { Component, OnInit } from '@angular/core';
import { PessoaHospede } from '../../../shared/models/pessoa';
import { CheckInService } from '../../../core/services/check-in.service';
import { CheckIn } from '../../../shared/models/check-in';

import { from, map, toArray } from 'rxjs';
import { CurrencyPipe } from '@angular/common';

enum FiltroHospedes {
  AindaPresentes = 'presente',
  JaDeixaram = 'passado'
}

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.scss'
})
export class ConsultasComponent implements OnInit {

  filtro = FiltroHospedes.AindaPresentes;
  hospedes: PessoaHospede[] = [];

  constructor(private checkInService: CheckInService) {}

  ngOnInit() {
    this.filtrarHospedes();
  }

  filtrarHospedes() {
    this.checkInService.buscarPorData(this.filtro).subscribe(res => {
      from(res)
        .pipe(
          map<CheckIn, PessoaHospede>(hospedagem => {
            return {
              ...hospedagem.pessoa,
              valorEstadia: this.calcularHospedagem(hospedagem)
            }
          }),
          toArray()
        ).subscribe(result => this.hospedes = result)
    });
  }

  private calcularHospedagem(checkIn: CheckIn) {
    const diaria = 120;
    const diariaFimDeSemana = 150;
    const diariaGaragem = 15;
    const diariaGaragemFimDeSemana = 20;

    let entrada = new Date(checkIn.dataEntrada);
    let saida = new Date(checkIn.dataSaida);

    let total = 0;

    let data = entrada

    while (data < saida) {
      if (data.getDay() == 0 || data.getDay() == 6) {
        total += diariaFimDeSemana;

        if (checkIn.adicionalVeiculo) total += diariaGaragemFimDeSemana;
      } else {
        total += diaria;

        if (checkIn.adicionalVeiculo) total += diariaGaragem;
      }

      data = this.adicionarDias(data, 1)
    }

    return total;
  }

  private adicionarDias(data: Date, dias: number) {
    var result = new Date(data.toString());
    result.setDate(result.getDate() + dias);
    return result;
  }
}
