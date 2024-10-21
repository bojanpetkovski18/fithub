import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../../shared/services/brands.service';

@Component({
  selector: 'app-slider-brands',
  templateUrl: './slider-brands.component.html',
  styleUrls: ['./slider-brands.component.scss']
})
export class SliderBrandsComponent implements OnInit {
  imageObject: Array<object> = [];

  constructor(private brandsService: BrandsService) { }

  ngOnInit() {
    this.brandsService.getBrands().subscribe((response) => {
      if (response && response.$values) {
        response.$values.forEach((item) => {
          this.imageObject.push({
            image: item.logoUrl,
            thumbImage: item.logoUrl,
            link: item.link
          })
        })
      }
    })
  }

}
