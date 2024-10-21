import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { ICategoryRequest } from '../../../shared/contracts/models';

@Component({
  selector: 'app-admin-add-category',
  templateUrl: './admin-add-category.component.html',
  styleUrls: ['./admin-add-category.component.css']
})
export class AdminAddCategoryComponent implements OnInit, OnDestroy {

  @Input() categoryUid!: string;
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  categoryForm!: FormGroup;

  constructor(private fb: FormBuilder, private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  // Initialize the form based on whether the categoryUid is provided (edit) or not (create)
  initializeForm(): void {
    if (this.categoryUid) {
      this.categoryService.getCategoryDetails(this.categoryUid).subscribe((value) => {
        this.setupForm(value.name);
      });
    } else {
      this.setupForm('');
    }
  }

  // Helper method to setup the form
  setupForm(name: string): void {
    this.categoryForm = this.fb.group({
      name: [name]
    });
  }

  clearForm(): void {
    this.categoryForm.reset();
  }

  saveForm(): void {
    const categoryData: ICategoryRequest = {
      name: this.categoryForm.value.name
    };

    if (this.categoryUid) {
      this.categoryService.editCategory(this.categoryUid, categoryData).subscribe(() => {
        this.afterSave();
      });
    } else {
      this.categoryService.createCategory(categoryData).subscribe(() => {
        this.afterSave();
      });
    }
  }

  afterSave(): void {
    this.clearForm();
    this.ngOnDestroy();
  }

  ngOnDestroy(): void {
    this.notify.emit('true');
  }
}