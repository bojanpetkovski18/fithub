import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BrandsService } from '../../services/brands.service';
import { IBrandRequest } from '../../../shared/contracts/models';

@Component({
  selector: 'app-admin-add-brand',
  templateUrl: './admin-add-brand.component.html',
  styleUrls: ['./admin-add-brand.component.css']
})
export class AdminAddBrandComponent implements OnInit, OnDestroy {

  @Input() brandUid!: string;
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  brandForm!: FormGroup;

  constructor(private fb: FormBuilder, private brandService: BrandsService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    if (this.brandUid) {
      this.brandService.getBrandDetails(this.brandUid).subscribe((value) => {
        this.setupForm(value.name, value.logoUrl, value.link);
      });
    } else {
      this.setupForm('', '', '');
    }
  }

  setupForm(name: string, logoUrl: string, link: string): void {
    this.brandForm = this.fb.group({
      name: [name],
      logoUrl: [logoUrl],
      link: [link]
    });
  }

  clearForm(): void {
    this.brandForm.reset();
  }

  saveForm(): void {
    const brandData: IBrandRequest = {
      name: this.brandForm.value.name,
      logoUrl: this.brandForm.value.logoUrl,
      link: this.brandForm.value.link
    };

    if (this.brandUid) {
      this.brandService.editBrand(this.brandUid, brandData).subscribe(() => {
        this.afterSave();
      });
    } else {
      this.brandService.createBrand(brandData).subscribe(() => {
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