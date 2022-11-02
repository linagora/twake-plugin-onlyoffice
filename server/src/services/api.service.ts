import { IApiServiceRequestParams, IApiService } from '@/interfaces/api.interface';
import axios, { Axios } from 'axios';

class ApiService implements IApiService {
  private axios: Axios;

  constructor(baseURL: string) {
    this.axios = axios.create({
      baseURL,
    });
  }

  public get = async <T>(params: IApiServiceRequestParams<T>): Promise<T> => {
    const { url } = params;

    const response = await this.axios.get(url);

    return response.data as T;
  };

  public post = async <T>(params: IApiServiceRequestParams<T>): Promise<T> => {
    const { url, payload } = params;

    const response = await this.axios.post(url, payload);

    return response.data as T;
  };
}

export default ApiService;
