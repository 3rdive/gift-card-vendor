import IUser from '../Interfaces/user.type';
import AuthRepository from '../Repositories/auth.repository';

export default class UserService {
    private authRepository= new AuthRepository();  
    
  public async getUser( id: number): Promise<IUser> {

        const user = await this.authRepository.getUserById(id) 
        if (!user) {
            throw new Error('User not found');
          }
          return user;
    }
  public async deleteUser( id: number): Promise<void> {
     await this.authRepository.userExits(id) 
    }
}