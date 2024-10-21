import { IResponse } from "src/app/app.common";

export interface IProduct {
    uid: string;
    name: string;
    imageUrl: string;
    oldPrice: number;
    newPrice: number;
    discount: number;
    quantity: number;
    rating: number;
    description: string;
    categoryUid: string;
    category: string;
    brandUid: string;
    brand: string;
    brandLogoUrl: string;
}

export interface IBrand {
    uid: string;
    name: string;
    logoUrl: string;
    link: string;
}

export interface IProgram {
    uid: string;
    title: string;
    thumbnailLink: string;
    videoLink: string;
    likes: number;
    dislikes: number;
}

export interface IProgramRequest {
    likes: number;
    dislikes: number;
}

export interface IShoppingCart {
    uid: string;
    quantity: number;
    totalPrice: number;
    products: IResponse<IProduct>;
}

export interface IPayment {
    customerName: string;
    customerSurname: string;
    customerAddress: string;
    customerEmail: string;
    customerPhone: string;
}

export interface IRegisterUser {
    username: string;
    password: string;
    role: Role;
}

export interface ILoginUser {
    username: string;
    password: string;
}

export interface IUserInfo {
    username: string;
    role: Role,
    shoppingCartUid: string;
}

export enum Role {
    Admin,
    Customer
}