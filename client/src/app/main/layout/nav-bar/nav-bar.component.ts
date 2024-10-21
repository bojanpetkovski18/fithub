import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../client/shared/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  imgSrc = "";
  username: string | null = null; 
  hovered = false;
  isAdmin = false;

  constructor(private userService: UserService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.userService.currentUsername.subscribe(username => {
      if (username) {
        this.username = username;
      } else {
        this.username = sessionStorage.getItem('username');
      }
      this.isAdmin = this.userService.isAdmin();
      this.cd.detectChanges();
    });

    this.imgSrc = "assets\\images\\logo.png";
  }

  logout() {
    this.userService.updateUsername(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('shoppingCartUid');
    sessionStorage.removeItem('role');
    
    this.cd.detectChanges();
    window.location.reload();
    this.username = "";
  }
}
