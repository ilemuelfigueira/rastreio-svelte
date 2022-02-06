import axios, { AxiosRequestConfig } from 'axios';
import { RastreioResponse } from './index.types';

export async function buscarObjeto(codigo: string): Promise<RastreioResponse> {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: `https://cors-anywhere.herokuapp.com/https://proxyapp.correios.com.br/v1/sro-rastro/${codigo}`,
  };

  const { data } = await axios.request(config);

  const isValid = data.objetos[0].eventos;

  if (!isValid) throw new Error('Código inválido');

  return data;
}
