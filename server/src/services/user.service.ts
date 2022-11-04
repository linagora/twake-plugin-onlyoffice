import { IuserService, UserType } from '@/interfaces/user.interface';
import apiService from './api.service';

class UserService implements IuserService {
  public getCurrentUser = async (token: string): Promise<UserType> => {
    try {
      const { resource } = await apiService.get<{ resource: UserType }>({
        url: '/users/v1/users/me',
        token,
      });

      return resource;
    } catch (error) {
      console.error('Failed to fetch the current user', error.message);

      return Promise.reject();
    }
  };
}

export default new UserService();
