import { Pessoa } from "./pessoa";

export interface CheckIn {
  pessoa: Pessoa,
  dataEntrada: Date,
  dataSaida: Date,
  adicionalVeiculo: boolean,
}
