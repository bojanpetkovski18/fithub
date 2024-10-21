import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../../contracts/models';
import { ProductsService } from '../../../services/products.service';
import { ShoppingCartService } from '../../../services/shopping-cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  uid: string = '';
  product: IProduct | undefined;

  shoppingCartUid: string = "";

  @Output() productAddedToCart: EventEmitter<void> = new EventEmitter<void>();


  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private productsService: ProductsService,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit() {
    this.uid = this.route.snapshot.params['uid'];
    this.productsService.getProductDetails(this.uid).subscribe((response) => {
      if (response) {
        this.product = response;
      }
    })

    const storedCartUid = sessionStorage.getItem('shoppingCartUid');
    if (storedCartUid) {
      this.shoppingCartUid = storedCartUid;
    } 
  }

  onAddToCart() {
    if (this.product && this.shoppingCartUid) {
      this.shoppingCartService.addProductToCart(this.shoppingCartUid, this.product.uid).subscribe(() => {
        window.location.reload();
        this.productAddedToCart.emit(); 
      });
    } else {
      alert("You must authenticate first!");
    }
  }

  OnBack() {
    this.location.back();
  }
}