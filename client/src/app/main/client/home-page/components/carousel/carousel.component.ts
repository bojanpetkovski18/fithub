import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  imageObject: Array<object> = [{
    image: 'assets/images/coru-1.png',
    thumbImage: 'assets/images/coru-1.png'
  },
  {
    image: 'assets/images/coru-2.jpeg', // Support base64 image
    thumbImage: 'assets/images/coru-2.jpeg'
  },
  {
    image: 'assets/images/coru-3.jpg', // Support base64 image
    thumbImage: 'assets/images/coru-3.jpg'
  },
  {
    image: 'assets/images/coru-4.jpg', // Support base64 image
    thumbImage: 'assets/images/coru-4.jpg'
  },
  {
    image: 'assets/images/coru-5.png', // Support base64 image
    thumbImage: 'assets/images/coru-5.png'
  }
  ];

  constructor() { }

  ngOnInit() {
  }

}
