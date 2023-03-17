// encrypt.ts
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import config from './config';
import User from '../Models/user.model';

export  class Encrypt {
  private pepper = config.BCRYPT_PASSWORD;
  private saltRound = config.SALT_ROUNDS;
  private secret = config.SECRET;

  public bcrypt = async (str: string): Promise<string> => {
    return bcrypt.hash(str + this.pepper, this.saltRound);
  };

  public generateAccessToken = async (user: User[]): Promise<string> => {
    const data = {
      user_id: user[0].id,
      email: user[0].email,
    };
    return sign(data, this.secret, { expiresIn: '7d' });
  };

  public compare = async (
    compare: string,
    against: string
  ): Promise<boolean> => {
    return bcrypt.compare(compare + this.pepper, against);
  };
}

export default new Encrypt();
