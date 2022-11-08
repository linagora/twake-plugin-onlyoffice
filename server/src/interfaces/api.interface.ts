export interface IApiServiceRequestParams<T> {
  url: string;
  payload?: T;
  token?: string;
}

export interface IApiService {
  get<T>(params: IApiServiceRequestParams<T>): Promise<T>;
  post<T>(params: IApiServiceRequestParams<T>): Promise<T>;
}

export interface IApiServiceApplicationTokenRequestParams {
  id: string;
  secret: string;
}

export interface IApiServiceApplicationTokenResponse {
  resource: {
    access_token: {
      time: number;
      expiration: number;
      value: string;
      type: string;
    };
  };
}
