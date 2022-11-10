import {
  IApiServiceRequestParams,
  IApiService,
  IApiServiceApplicationTokenRequestParams,
  IApiServiceApplicationTokenResponse,
} from '@/interfaces/api.interface';
import axios, { Axios, AxiosRequestConfig, AxiosResponse } from 'axios';
import { TWAKE_ENDPOINT, APP_ID, APP_SECRET } from '@config';
import loggerService from './logger.service';
class ApiService implements IApiService {
  private axios: Axios;
  private initialized: Promise<string>;

  constructor() {
    this.initialized = this.init();
    this.initialized.catch(error => {
      loggerService.error('failed to init API', error);
    });
  }

  public get = async <T>(params: IApiServiceRequestParams<T>): Promise<T> => {
    const { url, token, responseType, headers } = params;

    await this.initialized;

    const config: AxiosRequestConfig = {};

    if (token) {
      config['headers'] = {
        Authorization: `Bearer ${token}`,
        ...headers,
      };
    }

    if (responseType) {
      config['responseType'] = responseType;
    }

    return await this.axios.get(url, config);
  };

  public post = async <T, R>(params: IApiServiceRequestParams<T>): Promise<R> => {
    const { url, payload, headers } = params;

    await this.initialized;

    return await this.axios.post(url, payload, {
      headers: {
        ...headers,
      },
    });
  };

  private handleErrors = (error: any): Promise<any> => {
    loggerService.error('Failed Request', error.message);

    return Promise.reject(error);
  };

  private handleResponse = <T>({ data }: AxiosResponse): T => data;

  private init = async (): Promise<string> => {
    try {
      const response = await axios.post<IApiServiceApplicationTokenRequestParams, { data: IApiServiceApplicationTokenResponse }>(
        `${TWAKE_ENDPOINT}api/console/v1/login`,
        {
          id: APP_ID,
          secret: APP_SECRET,
        },
        {
          headers: {
            Authorization: `Basic ${Buffer.from(`${APP_ID}:${APP_SECRET}`).toString('base64')}`,
          },
        },
      );

      const {
        resource: {
          access_token: { value },
        },
      } = response.data;

      this.axios = axios.create({
        baseURL: TWAKE_ENDPOINT,
        headers: {
          Authorization: `Bearer ${value}`,
        },
      });

      this.axios.interceptors.response.use(this.handleResponse, this.handleErrors);

      return value;
    } catch (error) {
      loggerService.error('failed to get application token', error.message);
      throw Error(error);
    }
  };
}

export default new ApiService();
