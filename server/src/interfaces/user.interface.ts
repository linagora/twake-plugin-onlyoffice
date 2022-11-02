export type UserType = {
  id: string;
  name: string;
};

export interface IuserService {
  get: (id: string, token: string) => Promise<UserType>;
}
