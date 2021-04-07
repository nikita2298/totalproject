import { Component, OnInit } from '@angular/core';
import { puzzle } from 'src/app/interfaces/puzzle';
import { PuzzlesService } from 'src/app/services/puzzles.service';
import { puzzleResult } from 'src/app/interfaces/puzzle_result';
import { user } from 'src/app/interfaces/user';

@Component({
  selector: 'app-puzzles',
  templateUrl: './puzzles.component.html',
  styleUrls: ['./puzzles.component.scss']
})
export class PuzzlesComponent implements OnInit {
  puzzles: puzzle[]=[];
  users: user[]=[];
  user: user | undefined;

  // getting the id of user from local storage
  id:any = localStorage.getItem("user1");

  // An array to store all the Puzzle Result
  puzzleResults:puzzleResult[]=[];

  // variable to store an specific puzzle Result field
  specificResult: puzzleResult | undefined;
  constructor(private puzzleService: PuzzlesService) { }

  ngOnInit(): void {
    this.puzzleService.getPuzzles().subscribe((ret: any[])=>{
      console.log(ret);
      this.puzzles = ret;
    }) 

      //to get all the users 
      this.puzzleService.getUsers().subscribe((ret: any[])=>{
        console.log(ret);
        this.users = ret;
      }) 
      // this.users= this.puzzleService.getUsers();
  
      // to get all the result from Puzzle result table
      this.puzzleService.getPuzzleResult().subscribe((ret: any[])=>{
        console.log(ret);
        this.puzzleResults = ret;
      }) 
  }

    
    
  
    submit(puzzle_id: number){
     
      console.log(puzzle_id);
  
     console.log(this.id);
     this.user = this.users.find((m)=> m.user_id==this.id);
     this.specificResult = this.puzzleResults.find((m)=> m.user_id==this.id);
  
     console.log(this.user);
     console.log(this.specificResult);
  
     this.puzzleService.sendEmail("http://localhost:8080/api/puzzleresult/sendmail",this.user,this.specificResult).subscribe(
       data => {
         let res:any = data;
         console.log(`mail has been sent succesfully to ${this.user?.email} email Id. `);      
       },
       err => {
         console.log(err);
         
       }
     );
  
    }
  

}
