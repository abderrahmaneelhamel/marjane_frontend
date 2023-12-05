import { Responsible } from '../../../Interfaces/Responsible';
import { ResponsibleService } from '../../../services/responsible/responsible.service';
import { Component, OnInit } from '@angular/core';
import { PromotionService } from 'src/app/services/promotion/promotion.service';
import { Promotion } from '../../../Interfaces/Promotion';
import { Category } from 'src/app/Interfaces/Category';
import { Product } from 'src/app/Interfaces/Product';

@Component({
  selector: 'app-table',
  templateUrl: './PromotionsTable.component.html',
  styleUrls: ['./PromotionsTable.component.css']
})
export class TableComponent implements OnInit {

  public promotions: Promotion[] = [];
  public responsibles: Responsible[] = [];
  newPromotion: Promotion = {
    responsible: {} as Responsible,
    categorie: {} as Category,
    produit: {} as Product,
    datepromo: '', 
    reduction: 0,
    statut: null, 
    quantity: 0
  };
  
  

  constructor(private promotionService: PromotionService, private responsibleService: ResponsibleService) {}

  ngOnInit(): void {
    this.getPromotions();
    this.getResponsibles();
  }

  onSubmit() {
    // this.promotionService.createPromotion(this.newPromotion).subscribe(
    //   (promotion) => {
    //     this.promotions.push(promotion);
    //     this.newPromotion = {}
    //   })
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

  // createPromotion() {
  //   this.promotionService.createPromotion(this.newPromotion).subscribe(
  //     (createdPromotion) => {
  //       console.log('Promotion created:', createdPromotion);
  //       this.getPromotions();
  //     },
  //     (error) => {
  //       console.error('Error creating promotion:', error);
  //     }
  //   );
  // }

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
