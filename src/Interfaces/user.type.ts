

export default interface IUser{
    id: number;    //comment out the id
    user_name: string;
    email: string;
    password : string;
    phone_number: number;
    country: string;
    // passwordEncrypt:string
    createdAt: Date;
    updatedAt: Date;
}


