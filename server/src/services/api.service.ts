import { IApiServiceRequestParams, IApiService } from '@/interfaces/api.interface';
import axios, { Axios, AxiosRequestConfig, AxiosResponse } from 'axios';
import { TWAKE_API } from '@config';
class ApiService implements IApiService {
  private axios: Axios;

  constructor(baseURL: string) {
    this.axios = axios.create({
      baseURL,
    });

    this.axios.interceptors.response.use(this.handleResponse, this.handleErrors);
  }

  public get = async <T>(params: IApiServiceRequestParams<T>): Promise<T> => {
    const { url, token } = params;

    return await this.axios.get(url, this.getRequestConfig(token));
  };

  public post = async <T, R>(params: IApiServiceRequestParams<T>): Promise<R> => {
    const { url, payload, token } = params;

    return await this.axios.post(url, payload, this.getRequestConfig(token));
  };

  private getRequestConfig = (token: string): AxiosRequestConfig => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  private handleErrors = (error: any): Promise<any> => {
    console.debug('Request Failed', error.message);

    return Promise.reject(error);
  };

  private handleResponse = <T>({ data }: AxiosResponse): T => data;
}

export default new ApiService(TWAKE_API);
