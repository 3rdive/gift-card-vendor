export  interface GiftcardsInterface{
    Transaction_code: number;
    type: string;
    code: string;
    rate: number;
    unit: number;
    total_amount: number;
    is_redeemed: boolean;
    image: string
    expiration_date: Date;
    transaction_feedback: string;
}
export  interface GiftcardsData{
    rate: number;
    unit: number;
}



export  type giftcardType = {
    walmart : string;
    itunes: string;
    google_play: string;

}