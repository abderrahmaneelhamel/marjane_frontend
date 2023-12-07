import { Responsible } from '../../../Interfaces/Responsible';
import { ResponsibleService } from '../../../services/responsible/responsible.service';
import { Component, OnInit } from '@angular/core';
import { PromotionService } from 'src/app/services/promotion/promotion.service';
import { Promotion } from '../../../Interfaces/Promotion';
import { Category } from 'src/app/Interfaces/Category';
import { Product } from 'src/app/Interfaces/Product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './PromotionsTable.component.html',
  styleUrls: ['./PromotionsTable.component.css']
})
export class TableComponent implements OnInit {

  private readonly PENDING_STATUS = 'PENDING';

  public promotionForm! : FormGroup;
  public promotionUpdateForm!: FormGroup;


  constructor(private responsibleService: ResponsibleService, private fb: FormBuilder, private promotionService: PromotionService){}
  public promotions : any;

  product: Product = {
    id: 0,
    name: '',
    price: 0,
    quantity: 0,
    category: null
  };
  responsibles: Responsible[] = [];
  responsible: Responsible = {
    id: 2,
    name: '',
    email: '',
    password: '',
  };
  category : Category = {
    id: 0,
    name: '',
  };
  categories: Category[] = [
    { id: 1, name: 'Alimentation' },
    { id: 2, name: 'Vêtements' },
    { id: 3, name: 'Produits de parfum' }
  ];
  products: Product[] = [
    { id: 1, name: 'Product 1', price: 20.99, quantity: 50, category: { id: 1, name: 'Category 1' } },
    { id: 2, name: 'Product 2', price: 15.49, quantity: 30, category: { id: 2, name: 'Category 2' } },
  ];
  newPromotion: Promotion = {
    responsable_id: 0,
    categorie_id: 0,
    produit_id: 0,
    datepromo: '',
    reduction: 0,
    statut: this.PENDING_STATUS,
    quantity: 0
  };

  ngOnInit(): void {
    this.initializeForms();
    this.getPromotions();
    this.getResponsibles();
  }

  private initializeForms(){
    this.promotionForm = this.initializeForm();    
    this.promotionUpdateForm = this.initializeForm();
  }
  private initializeForm(): FormGroup {
    return this.fb.group({
      datepromo: this.fb.control('', [Validators.required]),
      precentage: this.fb.control(0, [Validators.required]),
      category: this.fb.control(null, [Validators.required]),
      product: this.fb.control(null, [Validators.required]),
      quantity: this.fb.control(0, [Validators.required]),
    });
  }
  populateUpdateForm(promotion: any) {
    const promotionDate = new Date(promotion.datepromo);
  
    this.promotionUpdateForm.patchValue({
      precentage: promotion.reduction,
      category: promotion.categorie,
      product: promotion.produit,
      quantity: promotion.quantity,
      datepromo: promotionDate.toISOString().split('T')[0],
    });
  }

  onSubmit() {
    const { category, product, precentage, quantity, datepromo } = this.promotionForm.value;
  
    this.newPromotion = {
      responsable_id: 2,
      categorie_id: category.id,
      produit_id: product.id,
      datepromo: datepromo,
      reduction: precentage,
      statut: this.PENDING_STATUS,
      quantity,
    };
  
    this.promotionService.createPromotion(this.newPromotion).subscribe(
      (promotion) => {
        this.promotions.push(promotion);
        console.log(promotion);
        this.promotionForm.reset();
      },
      (error) => {
        console.error('Error creating promotion:', error);
      }
    );
  }
  

  onUpdate() {
    const updatedPromotion: any = {
      reduction: this.promotionUpdateForm.value.precentage,
      categorie_id: this.promotionUpdateForm.value.category.id,
      produit_id: this.promotionUpdateForm.value.product.id,
      quantity: this.promotionUpdateForm.value.quantity,
      datepromo: this.promotionUpdateForm.value.datepromo,
    };

    this.promotionService.updatePromotion(updatedPromotion).subscribe(
      (response) => {
        console.log('Promotion updated:', response);
        this.promotionUpdateForm.reset();
        this.getPromotions();
      },
      (error) => {
        console.error('Error updating promotion:', error);
      }
    );
  }
  

  getPromotions() {
    this.promotionService.getPromotions().subscribe(
      (promotions) => {
        this.promotions = promotions;
        console.log(this.promotions);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getPendingPromotions(){
    this.promotionService.getPromotions().subscribe(
      (promotions) => {
        this.promotions = promotions.filter(promotions => promotions.statut == "PENDING");
        console.log(this.promotions);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getResponsibles() {
    this.responsibleService.getResponisbles().subscribe(
      (responsibles) => {
        this.responsibles = responsibles;
        console.log(this.responsibles);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updatePromotion(promotion: Promotion) {
    this.promotionService.updatePromotion(promotion).subscribe(
      (updatedPromotion) => {
        console.log('Promotion updated:', updatedPromotion);
        this.getPromotions();
      },
      (error) => {
        console.error('Error updating promotion:', error);
      }
    );
  }

  deletePromotion(id: any) {
    this.promotionService.deletePromotion(id).subscribe(
      (data) => {
        console.log('Promotion deleted:', data);
        this.getPromotions();
      },
      (error) => {
        console.error('Error deleting promotion:', error);
      }
    );
  }
}
