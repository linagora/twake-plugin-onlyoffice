import { IApiServiceRequestParams, IApiService } from '@/interfaces/api.interface';
import axios, { Axios, AxiosRequestConfig, AxiosResponse } from 'axios';
import { TWAKE_API, APP_ID, APP_SECRET } from '@config';
class ApiService implements IApiService {
  private axios: Axios;

  constructor(baseURL: string) {
    this.axios = axios.create({
      baseURL,
      headers: {
        Authorization: `Basic ${Buffer.from(`${APP_ID}:${APP_SECRET}`).toString('base64')}`,
      },
    });

    this.axios.interceptors.response.use(this.handleResponse, this.handleErrors);
  }

  public get = async <T>(params: IApiServiceRequestParams<T>): Promise<T> => {
    const { url, token } = params;

    if (token) {
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      return this.axios.get(url, config);
    }

    return await this.axios.get(url);
  };

  public post = async <T, R>(params: IApiServiceRequestParams<T>): Promise<R> => {
    const { url, payload } = params;

    return await this.axios.post(url, payload);
  };

  private handleErrors = (error: any): Promise<any> => {
    console.debug('Request Failed', error.message);

    return Promise.reject(error);
  };

  private handleResponse = <T>({ data }: AxiosResponse): T => data;
}

export default new ApiService(TWAKE_API);
