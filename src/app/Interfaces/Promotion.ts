import { Category } from "./Category";
import { Product } from "./Product";
import { Responsible } from "./Responsible";

  export interface Promotion {
    id?: number;
    responsible: Responsible;
    categorie: Category;
    produit: Product;
    datepromo: string; 
    reduction: number;
    statut: any;
    quantity: number;
  }
  