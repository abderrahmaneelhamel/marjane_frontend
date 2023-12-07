import { Component, OnInit } from '@angular/core';
import { ResponsibleService } from '../../../services/responsible/responsible.service';
import { PromotionService } from 'src/app/services/promotion/promotion.service';
import { Responsible } from '../../../Interfaces/Responsible';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-validation-table',
  templateUrl: './validation-table.component.html',
  styleUrls: ['./validation-table.component.css']
})
export class ValidationTableComponent implements OnInit {

  public promotions: any;
  public responsibles: Responsible[] = [];
  public currentPage = 1;
  public itemsPerPage = 10;
  public perPage: number = 10;
  public total: number = 100;
  public totalItems = 0;
  public pagination: any;



  constructor(
    private responsibleService: ResponsibleService,
    private promotionService: PromotionService
  ) {}

  ngOnInit(): void {
    this.getPendingPromotions();
    this.getResponsibles();
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

  // getPendingPromotions() {
  //   this.promotionService.getPromotions().subscribe(
  //     (promotions) => {
  //       this.promotions = promotions.filter(promotion => promotion.statut === 'PENDING');
  //       console.log(this.promotions);
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }
  
  
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

  acceptPromotion(promotionId: any) {
    this.updatePromotionStatus(promotionId, 'ACCEPTED');
    Swal.fire({
      title: 'Success!',
      text: 'Promotion accepted.',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }

  refusePromotion(promotionId: any) {
    this.updatePromotionStatus(promotionId, 'REFUSED');
    Swal.fire({
      title: 'Refused!',
      text: 'Promotion Refused.',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }

  private updatePromotionStatus(promotionId: any, status: string) {
    const promotionToUpdate = this.promotions.find((promotion: { id: any }) => promotion.id === promotionId);
  
    if (!promotionToUpdate) {
      console.error(`Promotion with ID ${promotionId} not found.`);
      return;
    }
  
    const updatedPromotion: any = {
      id: promotionId,
      responsable_id: promotionToUpdate.responsable.id,
      categorie_id: promotionToUpdate.categorie.id,
      produit_id: promotionToUpdate.produit.id,
      datepromo: promotionToUpdate.datepromo,
      reduction: promotionToUpdate.reduction,
      statut: status,
      quantity: promotionToUpdate.quantity,
    };
    console.log('====================================');
    console.log(updatedPromotion);
    console.log('====================================');    
  
    this.promotionService.updatePromotion(updatedPromotion).subscribe(
      (response) => {
        console.log(`Promotion ${status.toLowerCase()}ed:`, response);
        this.getPendingPromotions();
      },
      (error) => {
        console.error(`Error ${status.toLowerCase()}ing promotion:`, error);
      }
    );
  }
  get totalPages(): number[] {
    return Array.from({ length: Math.ceil(this.totalItems / this.itemsPerPage) }, (_, index) => index + 1);
  }

  getPendingPromotions() {
    this.promotionService.getPromotions().subscribe(
      (promotions) => {
        this.totalItems = promotions.filter(promotion => promotion.statut === 'PENDING').length;
        this.promotions = promotions.filter(promotion => promotion.statut === 'PENDING')
          .slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
        console.log(this.promotions);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  changePage(page: number) {
    console.log('Changing page to:', page);
    if (page >= 1 && page <= this.totalPages.length) {
      this.currentPage = page;
      this.getPendingPromotions();
    }
  }

  getMinValue(currentPage: number, perPage: number, total: number): number {
    return Math.min(currentPage * perPage, total);
  }

  getMaxValue(currentPage: number, perPage: number, total: number): number {
    return Math.min((currentPage + 1) * perPage, total);
  }  
}
