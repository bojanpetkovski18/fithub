import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../services/brands.service';
import { IBrand } from '../../shared/contracts/models';

@Component({
  selector: 'app-admin-brands',
  templateUrl: './admin-brands.component.html',
  styleUrls: ['./admin-brands.component.css']
})
export class AdminBrandsComponent implements OnInit {
  flag: boolean = false;
  count: number = 0;
  productsCount: number = 0;

  brandUid = "";

  data: IBrand[] = []; 
  filteredData: IBrand[] = []; 
  searchTerm: string = '';

  constructor(private brandsService: BrandsService) { }

  ngOnInit(): void {
    this.loadBrands();
  }

  OnAddBrand() {
    this.flag = !this.flag;
    this.brandUid = "";
  }

  onNotify(value: string): void {
    if (value) {
      this.flag = false;
      this.loadBrands();
    }
  }

  loadBrands() {
    this.brandsService.getBrands().subscribe((response) => {
      if (response && response.$values) {
        this.data = response.$values;
        this.filteredData = response.$values;
        this.count = response.$values.length;
      }
    });
  }
  
  filterBrands(): void {
    const term = this.searchTerm.toLowerCase();

    if (term) {
      this.filteredData = this.data.filter(brand =>
        brand.name.toLowerCase().includes(term)
      );
    } else {
      this.filteredData = this.data;
    }
  }

  onEdit(uid: string) {
    this.flag = !this.flag;
    this.brandUid = uid;
  }

  onDelete(uid: string) {
    this.brandsService.deleteBrand(uid).subscribe(() => {
      this.loadBrands();
    })
  }
}