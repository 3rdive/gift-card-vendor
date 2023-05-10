import { IToken } from "../Interfaces/token.interface";
import Token from "../Models/token.model";


export  class TokenRepository {
     async create(token: IToken): Promise<IToken> {
        return await Token.query().insert(token);
      }

  async deleteToken(id: number): Promise<void> {
    await Token.query().delete().where('userId', id);
  }

  async findToken(id: number) : Promise<IToken | undefined> {
    return Token.query().findOne({userId : id});
   }
  async invalidateTokens(userId: number): Promise<void> {
    await Token.query()
      .where('userId', '=', userId)
      .patch({ isValid: false });
  }
  
}
