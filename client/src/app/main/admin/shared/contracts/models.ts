export interface IShoppingCart {
    uid: string;
    products: IProduct[];
    quantity: number;
    totalPrice: number;
}

export interface IBrand {
    uid: string;
    name: string;
    logoUrl: string;
    link: string;
}

export interface IBrandRequest {
    name: string;
    logoUrl: string;
    link: string;
}

export interface ICategory {
    uid: string;
    name: string;
}

export interface ICategoryRequest {
    name: string;
}

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

export interface IProductRequest {
    name: string;
    imageUrl: string;
    price: number;
    discount: number;
    quantity: number;
    rating: number;
    description: string;
    categoryUid: string;
    brandUid: string;
}

export interface IPayment {
    uid: string;
    customerName: string;
    customerSurname: string;
    customerAddress: string;
    customerEmail: string;
    customerPhone: string;
    products: IProduct[];
    quantity: number;
    totalPrice: number;
}