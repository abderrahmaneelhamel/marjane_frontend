import { Component, OnInit } from '@angular/core';
import { PromotionService } from 'src/app/services/promotion.service';
import { Promotion } from '../../Promotion';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  public promotions: Promotion[] = [];
  public newPromotion: Promotion = {
    promotionDescription: '',
    discountPercentage: 0,
    productCategory: '',
    startTime: '',
    endTime: '',
    quantity: 0,
    loyaltyPointsEarned: 0,
    product: {
      id: 0,
      name: '',
      price: 0,
      quantity: 0,
      category: null
    },
    admin: undefined,
    promotionApprovals: []
  };
  

  constructor(private promotionService: PromotionService) {}

  ngOnInit(): void {
    this.getPromotions();
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

  createPromotion() {
    this.promotionService.createPromotion(this.newPromotion).subscribe(
      (createdPromotion) => {
        console.log('Promotion created:', createdPromotion);
        this.getPromotions();
      },
      (error) => {
        console.error('Error creating promotion:', error);
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
