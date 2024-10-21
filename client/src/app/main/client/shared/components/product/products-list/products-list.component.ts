import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../../contracts/models';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  @Input() category: string | undefined;

  products: Array<IProduct> = [];
  product: IProduct | undefined;

  options = {
    name: '',
    brand: '',
    filters: {
      sortBy: 'Name asc',
      page: 1
    }
  }

  constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((response) => {
      if (response && response.$values) {
        this.products = response.$values.filter((value) => value.category == this.category);
      }
    })
  }

  onNameClear() {
    this.options.name = '';
  }

  onBrandClear() {
    this.options.brand = '';
  }
}
