import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { IProduct, IShoppingCart } from '../../contracts/models';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCart: IShoppingCart | null = null;
  products: IProduct[] = [];
  isDisabled = true;

  username = "";

  constructor(private shoppingCartService: ShoppingCartService, private userService: UserService) {}

  ngOnInit(): void {
    this.username = sessionStorage.getItem("username") ?? "";
    this.loadCart();
  }

  loadCart() {
    this.userService.getUserInfo(this.username).subscribe((user) => {
      if (user) {
        this.shoppingCartService.getCartItems(user.shoppingCartUid).subscribe((cart) => {
          if (cart) {
            this.shoppingCart = cart;
            this.products = cart.products.$values;
            this.isDisabled = !(this.products.length > 0);
            sessionStorage.setItem('shoppingCartUid', cart.uid);
          }
        })
      }
    });
  }

  handleProductAdded() {
    this.loadCart();
    window.location.reload();
  }

  clearItems() {
    if (this.shoppingCart) {
      this.shoppingCartService.clearCartItems(this.shoppingCart.uid).subscribe(() => {
        this.loadCart();
        window.location.reload();
      })
    }
  }
}