export interface Endereco {
  cidade: string;
  uf: string;
  bairro: string;
  cep: string;
  logradouro: string;
  numero: string;
}

export interface Unidade {
  endereco: Endereco;
  tipo: string;
  codSro: string;
  nome: string;
}

export interface Endereco2 {
  cidade: string;
  uf: string;
}

export interface UnidadeDestino {
  endereco: Endereco2;
  tipo: string;
}

export interface Destinatario {
  cep: string;
}

export interface Evento {
  codigo: string;
  descricao: string;
  dtHrCriado: Date;
  tipo: string;
  unidade: Unidade;
  urlIcone: string;
  unidadeDestino: UnidadeDestino;
  destinatario: Destinatario;
}

export interface TipoPostal {
  categoria: string;
  descricao: string;
  sigla: string;
}

export interface Objeto {
  codObjeto: string;
  eventos: Evento[];
  modalidade: string;
  tipoPostal: TipoPostal;
  habilitaAutoDeclaracao: boolean;
  permiteEncargoImportacao: boolean;
  habilitaPercorridaCarteiro: boolean;
  bloqueioObjeto: boolean;
  possuiLocker: boolean;
  habilitaLocker: boolean;
  habilitaCrowdshipping: boolean;
}

export interface RastreioResponse {
  objetos: Objeto[];
  quantidade: number;
  resultado: string;
  versao: string;
}
