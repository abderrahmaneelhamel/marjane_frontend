import { Responsible } from '../../../Interfaces/Responsible';
import { ResponsibleService } from '../../../services/responsible/responsible.service';
import { Component, OnInit } from '@angular/core';
import { PromotionService } from 'src/app/services/promotion/promotion.service';
import { Promotion } from '../../../Interfaces/Promotion';
import { Category } from 'src/app/Interfaces/Category';
import { Product } from 'src/app/Interfaces/Product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-validation-table',
  templateUrl: './validation-table.component.html',
  styleUrls: ['./validation-table.component.css']
})
export class ValidationTableComponent implements OnInit{

  public promotionForm! : FormGroup;


  constructor(private responsibleService: ResponsibleService, private fb: FormBuilder, private promotionService: PromotionService){}

  public promotions : any;


  ngOnInit(): void {
    this.promotionForm = this.fb.group({
      dateDebut: this.fb.control('', [Validators.required]),
      precentage: this.fb.control(0, [Validators.required]),
      category: this.fb.control(null, [Validators.required]),
      product: this.fb.control(null, [Validators.required]),
      quantity: this.fb.control(0, [Validators.required]),
    });    
    this.getPendingPromotions();
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

  deletePromotion(id: any) {
    this.promotionService.deletePromotion(id).subscribe(
      (data) => {
        console.log('Promotion deleted:', data);
        this.getPendingPromotions();
      },
      (error) => {
        console.error('Error deleting promotion:', error);
      }
    );
  }
}
