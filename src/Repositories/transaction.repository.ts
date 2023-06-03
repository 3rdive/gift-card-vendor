import TransactionRef from "../Models/transactionRef";


export  class TransactionCodeRepository {
     async create(code: ITransaction): Promise<TransactionRef> {
        return  TransactionRef.query().insert(code);
      }
     async findByUserId(userId: number): Promise<TransactionRef | undefined> {
        return TransactionRef.query().where("user_id", userId).first();
}
     async findByCode(code: number): Promise<TransactionRef | undefined> {
        return TransactionRef.query().findOne({code });
}
}
