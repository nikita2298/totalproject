import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = 'BestifyYourTime';

  isLoggedIn = false;
  showAdminBoard = false;
  username!: string;
  roles!: false;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      // his.roles = user.roles;
      this.roles = this.tokenStorageService.getUser().role;
      // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

      if (this.roles) {
        // alert("login");
        this.showAdminBoard = true;
      }

      this.username = user.username;
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
