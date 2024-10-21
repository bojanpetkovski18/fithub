import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IResponse } from 'src/app/app.common';
import { IProduct } from 'src/app/main/admin/shared/contracts/models';
import { ProductsService } from '../../../shared/services/products.service';

@Component({
  selector: 'app-onsale-products',
  templateUrl: './onsale-products.component.html',
  styleUrls: ['./onsale-products.component.scss'],
})
export class OnSaleProductsComponent implements OnInit {
  products: Array<IProduct> = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getProducts().subscribe((response) => {
      if (response && response.$values) {
        this.products = response.$values;
        
        this.products = this.products
          .sort((a, b) => b.discount - a.discount)
          .slice(0, 6);

      }
    });
  }
}