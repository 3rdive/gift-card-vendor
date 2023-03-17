import Transaction from "../../Models/transactionCode.model";

const generateTransactionCode = async (): Promise<string> => {
    const length = 8;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    let isUnique = false;
    while (!isUnique) {
      for (let i = 0; i < length; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      const transaction = await Transaction.query().where({ code }).first();
      isUnique = !transaction;
    }
    return code;
  };


  export default generateTransactionCode;
  