import { Component, OnInit } from '@angular/core';
import { ResponsibleService } from '../../../services/responsible/responsible.service';
import { PromotionService } from 'src/app/services/promotion/promotion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-validation-table',
  templateUrl: './validation-table.component.html',
  styleUrls: ['./validation-table.component.css']
})
export class ValidationTableComponent implements OnInit {

  pageSize = 2;
  currentPage = 1;

  public promotions: any;
  public totalItems = 0;



  constructor(
    private responsibleService: ResponsibleService,
    private promotionService: PromotionService
  ) {}

  ngOnInit(): void {
    this.getPendingPromotions();
  }


  // Pagination methods
  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
    console.log('Current Page:', this.currentPage);
    this.getPendingPromotions();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  get totalPages(): number {    
    return this.promotions ? Math.ceil(this.totalItems / this.pageSize) : 0;
  }
  
  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // getPromotions() {
  //   this.promotionService.getPromotions().subscribe(
  //     (promotions) => {
  //       this.promotions = promotions;
  //       console.log(this.promotions);
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }

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

  getPendingPromotions() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.promotionService.getPromotions().subscribe(
      (promotions) => {
        this.totalItems = promotions.filter(promotion => promotion.statut === 'PENDING').length;
        this.promotions = promotions.filter(promotion => promotion.statut === 'PENDING')
          .slice(startIndex, endIndex);
        console.log(this.promotions);
      },
      (error) => {
        console.error(error);
      }
    );
  } 
}
