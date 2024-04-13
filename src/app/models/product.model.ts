import { ICategory } from "./category.model";

// export interface IProduct{
//     Id:number;
//     name:string;
//     Quantity:number;
//     price:number;
//     Discount:number;
//     CategoryId:number;

// }

export interface IProduct {
    Id: number;
    name: string;
    Quantity: number;
    price: number;
    Discount: number;
    CategoryId: number;
    category: ICategory; 
  }
  