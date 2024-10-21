import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { ICategory } from '../../shared/contracts/models';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {
  flag: boolean = false;
  count: number = 0;
  productsCount: number = 0;

  categoryUid = "";

  data: ICategory[] = []; 
  filteredData: ICategory[] = []; 
  searchTerm: string = '';

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  OnAddCategory() {
    this.flag = !this.flag;
    this.categoryUid = "";
  }

  onNotify(value: string): void {
    if (value) {
      this.flag = false;
      this.loadCategories();
    }
  }

  loadCategories() {
    this.categoriesService.getCategories().subscribe((response) => {
      if (response && response.$values) {
        this.data = response.$values;
        this.filteredData = response.$values;
        this.count = response.$values.length;
      }
    });
  }
  
  filterCategories(): void {
    const term = this.searchTerm.toLowerCase();

    if (term) {
      this.filteredData = this.data.filter(category =>
        category.name.toLowerCase().includes(term)
      );
    } else {
      this.filteredData = this.data;
    }
  }

  onEdit(uid: string) {
    this.flag = !this.flag;
    this.categoryUid = uid;
  }

  onDelete(uid: string) {
    this.categoriesService.deleteCategory(uid).subscribe(() => {
      this.loadCategories();
    })
  }
}