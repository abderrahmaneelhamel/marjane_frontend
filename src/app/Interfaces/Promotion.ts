import { Category } from "./Category";
import { Product } from "./Product";
import { Responsible } from "./Responsible";

  export interface Promotion {
    id?: number;
    responsable_id: number;
    categorie_id: number;
    produit_id: number;
    datepromo: string; 
    reduction: number;
    statut: any;
    quantity: number;
  }
  