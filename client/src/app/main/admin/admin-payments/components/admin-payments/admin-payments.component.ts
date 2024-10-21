import { Component, OnInit } from '@angular/core';
import { IPayment } from '../../../shared/contracts/models';
import { PaymentsService } from '../../services/payments.service';
import { ProductsService } from '../../../admin-products/services/products.service';

@Component({
  selector: 'app-admin-payments',
  templateUrl: './admin-payments.component.html',
  styleUrls: ['./admin-payments.component.css']
})
export class AdminPaymentsComponent implements OnInit {
  count: number = 0;
  productsCount: number = 0;

  categoryUid = "";

  data: IPayment[] = []; 

  constructor(private paymentsService: PaymentsService, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments() {
    this.paymentsService.getPayments().subscribe((response) => {
      if (response && response.$values) {
        this.count = response.$values.length;
        response.$values.forEach(payment => {
          this.paymentsService.getProductsFromPayment(payment.uid).subscribe((value) => {
            if (value.$values.length) {
              const payment = value.$values[0]; 
              this.data.push({ 
                uid: payment.payment.uid,
                customerName: payment.payment.customerName,
                customerSurname: payment.payment.customerSurname,
                customerAddress: payment.payment.customerAddress,
                customerEmail: payment.payment.customerEmail,
                customerPhone: payment.payment.customerPhone,
                totalPrice: 0,
                quantity: 0,
                products: [payment.product]
              })
            }
          })
        })
      }
    });
  }
}
