export interface Pessoa {
  nome: String,
  CPF: string,
  telefone: String,
}

export interface PessoaHospede extends Pessoa {
  valorEstadia: number;
}
