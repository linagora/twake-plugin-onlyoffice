import { IApiService } from '@/interfaces/api.interface';
import { IuserService, UserType } from '@/interfaces/user.interface';

class UserService implements IuserService {
  constructor(private readonly Api: IApiService) {}

  public get = async (): Promise<UserType> => {
    return await this.Api.get<UserType>({
      url: '/api/user',
    });
  };
}

export default UserService;
