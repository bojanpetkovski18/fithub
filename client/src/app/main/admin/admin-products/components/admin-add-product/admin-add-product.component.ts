import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { CategoriesService } from '../../../admin-categories/services/categories.service';
import { BrandsService } from '../../../admin-brands/services/brands.service';
import { IBrand, ICategory, IProductRequest } from '../../../shared/contracts/models';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.scss'],
})
export class AdminAddProductComponent implements OnInit {
  @Input() productUid!: string;
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  productForm!: FormGroup;
  categories: ICategory[] = [];
  brands: IBrand[] = [];

  constructor(private fb: FormBuilder, 
              private productsService: ProductsService, 
              private categoriesService: CategoriesService,
              private brandsService: BrandsService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.setupForm('', '', 0, 0, 0, 0, '', '', '');
      combineLatest([
        this.categoriesService.getCategories(),
        this.brandsService.getBrands(),
      ]).subscribe(([categoriesResponse, brandsResponse]) => {

        if (categoriesResponse && categoriesResponse.$values) {
          this.categories = categoriesResponse.$values;
        }
    
        if (brandsResponse && brandsResponse.$values) {
          this.brands = brandsResponse.$values;
        }
      });

      if (this.productUid) { 
        this.productsService.getProductDetails(this.productUid).subscribe((response) => {
          if (response) {
            this.setupForm(
              response.name, 
              response.imageUrl, 
              response.oldPrice, 
              response.discount, 
              response.rating, 
              response.quantity,
              response.description, 
              response.categoryUid, 
              response.brandUid
            );
          } else {
            this.setupForm('', '', 0, 0, 0, 0, '', '', '');
          }
        });
      }
  }

  setupForm(name: string, 
    imageUrl: string,
    price: number,
    discount: number,
    rating: number,
    quantity: number,
    description: string,
    categoryUid: string,
    brandUid: string): void {
      this.productForm = this.fb.group({
      name: [name],
      imageUrl: [imageUrl],
      price: [price],
      discount: [discount],
      rating: [rating],
      quantity: [quantity],
      description: [description],
      categoryUid: [categoryUid],
      brandUid: [brandUid]
    });
  }

  clearForm(): void {
    this.productForm.reset();
  }

  saveForm(): void {
    const productData: IProductRequest = {
      name: this.productForm.value.name,
      imageUrl: this.productForm.value.imageUrl,
      price: +this.productForm.value.price,
      discount: +this.productForm.value.discount,
      quantity: +this.productForm.value.quantity,
      rating: +this.productForm.value.rating,
      description: this.productForm.value.description,
      categoryUid: this.productForm.value.categoryUid,
      brandUid: this.productForm.value.brandUid
    };

    if (this.productUid) {
      this.productsService.editProduct(this.productUid, productData).subscribe(() => {
        this.afterSave();
      });
    } else {
      this.productsService.createProduct(productData).subscribe(() => {
        this.afterSave();
      });
    }
  }

  afterSave(): void {
    this.clearForm();
    this.ngOnDestroy();
  }

  ngOnDestroy(): void {
    this.notify.emit('true');
  }
}