import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-navigation',
  templateUrl: './menu-navigation.component.html',
  styleUrls: ['./menu-navigation.component.scss']
})
export class MenuNavigationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
}
}
