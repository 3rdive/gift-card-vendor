import { giftcardType } from "../../Interfaces/gift.card";
import { GiftcardsData } from "../../Interfaces/gift.card";
import { BadRequestError } from "../ErrorUtils";

export const giftCardDataType = (type:giftcardType ) : GiftcardsData=>{
if(type === 'Walmart'){
    return {unit: 10, rate: 0.5}
}else if(type === 'Itunes'){
    return {unit: 20, rate:1.0}
}else if(type === 'Google Play'){
    return {unit: 50, rate: 1.5}
}else {
    throw new BadRequestError(`Gift card does not exist or it'\n s expired`)
}
}