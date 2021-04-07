import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { FavouriteService } from 'src/app/services/favourite.service';
import { favourites } from 'src/app/interfaces/favourites';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  favData: favourites[] = [];
  constructor(private token: TokenStorageService, private favouriteService: FavouriteService) { 
   
  }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    // console.log("Current user ", this.currentUser)
    this.userFavourite();
  }

  userFavourite(){
    this.favouriteService.getUserFav(this.currentUser.user_id).subscribe((ret: any) => {
      // console.log("Ret: ", ret);
      this.favData = ret;
      // console.log(this.favData);
    })
  }
  removeFav(quiz_id:number){
    this.favouriteService.DeleteFav(quiz_id,this.currentUser.user_id).subscribe((res) => {
      // console.log("Ret: ", res);
    })
  }
}

