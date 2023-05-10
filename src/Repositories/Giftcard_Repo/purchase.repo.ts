import Purchase from "../../Models/purchase.model";


export default class PurchaseRepository{
 async  getTotalPurchasedByUser(userId: number) {
    const purchases = await Purchase.query().where('user_id', userId);
    let totalPurchased = 0;
  
    for (const purchase of purchases) {
      totalPurchased += purchase.amount;
    }
  
    return totalPurchased;
  } 
}

  