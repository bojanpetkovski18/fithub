import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../../contracts/models';
import { ShoppingCartService } from '../../../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.css']
})
export class ShoppingCartItemComponent implements OnInit {
  @Input() product: IProduct | null = null;
  @Input() shoppingCartUid: string | null = null;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {
  }

  removeProduct(product: IProduct | null) {
    if (this.shoppingCartUid && product) {
      this.shoppingCartService.removeProductFromCart(this.shoppingCartUid, product.uid).subscribe(() => {
        this.product = null; 
      })
    }
  }
}
