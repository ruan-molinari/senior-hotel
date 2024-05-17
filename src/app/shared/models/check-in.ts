import { Pessoa } from "./pessoa";

export interface CheckIn {
  pessoa: Pessoa,
  dataEntrada: Date | string,
  dataSaida: Date | string,
  adicionalVeiculo: boolean,
}
