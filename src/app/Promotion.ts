import { Product } from "./Product";

export interface Promotion {
    id?: number;
    promotionDescription: string;
    discountPercentage: number;
    productCategory: string;
    startTime: string;
    endTime: string;
    quantity: number;
    loyaltyPointsEarned: number;
    admin: any;
    product: Product;
    promotionApprovals: any[];
  }
  