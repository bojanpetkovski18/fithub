import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from '../../../contracts/models';
import { ShoppingCartService } from '../../../services/shopping-cart.service';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css'],
})
export class ProductGridComponent implements OnInit {
  @Input() product: IProduct | undefined;
  shoppingCartUid: string = "";

  @Output() productAddedToCart: EventEmitter<void> = new EventEmitter<void>();

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
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
      }, error => {
        console.error('Failed to add product to cart:', error); 
      });
    } else {
      alert("You must authenticate first!");
    }
  }
}
