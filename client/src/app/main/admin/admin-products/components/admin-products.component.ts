import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { IProduct, IShoppingCart } from '../../shared/contracts/models';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit {
  flag: boolean = false;
  count: number = 0;

  productUid = "";

  data: IProduct[] = []; 
  filteredData: IProduct[] = []; 
  searchTerm: string = '';

  shoppingCart: IShoppingCart | undefined;

  constructor(private productsService: ProductsService, private cartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadShoppingCart();
  }

  OnAddProduct() {
    this.flag = !this.flag;
    this.productUid = "";
  }

  onNotify(value: string): void {
    if (value) {
      this.flag = false;
      this.loadProducts();
    }
  }

  loadProducts(): void {
    this.productsService.getProducts().subscribe((response) => {
      if (response && response.$values) {
        this.data = response.$values;
        this.filteredData = this.data;
        this.count = this.data.length;
      }
    });
  }

  loadShoppingCart(): void {
    if (!this.shoppingCart) {
      this.cartService.getShoppingCartDetails().pipe(
        switchMap((value) => {
          if (value) {
            return of(value);
          } else {
            return this.cartService.createShoppingCart();
          }
        })
      ).subscribe((cart) => {
        this.shoppingCart = cart;
      });
    }
  }
  
  filterProducts(): void {
    const term = this.searchTerm.toLowerCase();

    if (term) {
      this.filteredData = this.data.filter(product =>
        product.name.toLowerCase().includes(term)
      );
    } else {
      this.filteredData = this.data;
    }
  }

  onEdit(uid: string) {
    this.flag = !this.flag;
    this.productUid = uid;
  }

  onDelete(uid: string) {
    this.productsService.deleteProduct(uid).subscribe(() => {
      this.loadProducts();
    })
  }
}
