import { Responsible } from '../../../Interfaces/Responsible';
import { ResponsibleService } from '../../../services/responsible/responsible.service';
import { Component, OnInit } from '@angular/core';
import { PromotionService } from 'src/app/services/promotion/promotion.service';
import { Promotion } from '../../../Interfaces/Promotion';
import { Category } from 'src/app/Interfaces/Category';
import { Product } from 'src/app/Interfaces/Product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-table',
  templateUrl: './PromotionsTable.component.html',
  styleUrls: ['./PromotionsTable.component.css']
})
export class TableComponent implements OnInit {

  private readonly PENDING_STATUS = 'PENDING';

  pageSize = 2;
  currentPage = 1;

  public promotionForm! : FormGroup;
  public promotionUpdateForm!: FormGroup;


  constructor(private fb: FormBuilder, private promotionService: PromotionService){}
  public promotions : any;
  public allPromotions : any;

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
    this.getAllPromotions();
  }

  // Pagination methods
  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
    console.log('Current Page:', this.currentPage);
    this.getPromotions();
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
    return this.promotions ? Math.ceil(this.allPromotions.length / this.pageSize) : 0;
  }
  
  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }


  
  private initializeForms(){
    this.promotionForm = this.initializeForm();    
    this.promotionUpdateForm = this.initializeForm();
  }
  private initializeForm(): FormGroup {
    return this.fb.group({
      id: this.fb.control(null),
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
      id: promotion.id,
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
  
        Swal.fire({
          title: 'Success!',
          text: 'Promotion created successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      },
      (error) => {
        console.error('Error creating promotion:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to create promotion. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }
  

  onUpdate() {
    const updatedPromotion: any = {
      id: this.promotionUpdateForm.value.id,
      responsable_id: 2,
      reduction: this.promotionUpdateForm.value.precentage,
      categorie_id: this.promotionUpdateForm.value.category.id,
      produit_id: this.promotionUpdateForm.value.product.id,
      quantity: this.promotionUpdateForm.value.quantity,
      statut: this.PENDING_STATUS,
      datepromo: this.promotionUpdateForm.value.datepromo,
    };
    console.log(updatedPromotion);

    this.promotionService.updatePromotion(updatedPromotion).subscribe(
      (response) => {
        console.log('Promotion updated:', response);
        this.promotionUpdateForm.reset();
        this.getPromotions();
        Swal.fire({
          title: 'Success!',
          text: 'Promotion updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      },
      (error) => {
        console.error('Error updating promotion:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update promotion. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }
  

  getPromotions() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    console.log('==============555555555======================');
    console.log(startIndex,endIndex);
    console.log('==============555555555======================');
  
    this.promotionService.getPromotions().subscribe(
      (promotions) => {
        this.promotions = promotions.slice(startIndex, endIndex);
        console.log(this.promotions);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getAllPromotions(){
    this.promotionService.getPromotions().subscribe(
      (promotions) => {
        this.allPromotions = promotions;
        console.log(this.allPromotions);
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
  deletePromotionConfirmation(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletePromotion(id);
        console.log('Deleting promotion...');
        Swal.fire('Deleted!', 'Your promotion has been deleted.', 'success');
      } else {
        console.log('Delete canceled by user.');
      }
    });
  }
}
