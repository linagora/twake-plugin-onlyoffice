export interface IApiServiceRequestParams<T> {
  url: string;
  payload?: T;
}

export interface IApiService {
  get<T>(params: IApiServiceRequestParams<T>): Promise<T>;
  post<T>(params: IApiServiceRequestParams<T>): Promise<T>;
}
