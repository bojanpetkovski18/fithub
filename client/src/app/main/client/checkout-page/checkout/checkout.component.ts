import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { IPayment, IProduct, IShoppingCart } from '../../shared/contracts/models';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../../shared/services/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  shoppingCart: IShoppingCart | null = null;
  products: IProduct[] = [];
  paymentForm: FormGroup;

  constructor(private router: Router,
              private shoppingCartService: ShoppingCartService, 
              private paymentService: PaymentService,
              private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      customerName: ['', Validators.required],
      customerSurname: ['', Validators.required],
      customerAddress: ['', Validators.required],
      customerEmail: ['', [Validators.required, Validators.email]],
      customerPhone: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    const shoppingCartUid = sessionStorage.getItem('shoppingCartUid');

    if (shoppingCartUid) {
      this.shoppingCartService.getCartItems(shoppingCartUid).subscribe((response) => {
        if (response && response.products.$values) {
          this.shoppingCart = response;
          this.products = response.products.$values;
        }
      })
    }
  }

  cancelCheckout() {
    this.router.navigateByUrl('/');
  }

  buyProducts() {
    if (this.shoppingCart) {
      const shoppingCartUid = this.shoppingCart.uid;

      if (this.paymentForm.valid) {
        const paymentData: IPayment = this.paymentForm.value;
        
        this.paymentService.createPayment(shoppingCartUid, paymentData).subscribe((payment) => {
          if (payment && payment.uid) {
            this.shoppingCart?.products.$values.forEach(product => {
              this.paymentService.addProductsToPayment(payment.uid, product.uid).subscribe(() => {
                this.shoppingCartService.clearCartItems(shoppingCartUid).subscribe(() => {
                  this.loadCart();
                  alert("Products succesfully bought.");
                  this.router.navigateByUrl('/');
                });
              })
            });
          }
        })
      }
    }
  }
}
