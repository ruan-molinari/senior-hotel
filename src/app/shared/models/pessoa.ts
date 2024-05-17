export interface Pessoa {
  nome: string,
  CPF: string,
  telefone: String,
}

export interface PessoaHospede extends Pessoa {
  valorEstadia: number;
}
