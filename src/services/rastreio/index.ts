import axios, { AxiosRequestConfig } from 'axios';
import { Objeto, RastreioResponse } from './index.types';

export async function buscarObjeto(
  codigo: string,
  cb?: (param: Objeto[]) => void,
): Promise<RastreioResponse> {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: `https://cors-anywhere.herokuapp.com/https://proxyapp.correios.com.br/v1/sro-rastro/${codigo}`,
  };

  const { data } = await axios.request<RastreioResponse>(config);

  cb(data.objetos);

  return data;
}
