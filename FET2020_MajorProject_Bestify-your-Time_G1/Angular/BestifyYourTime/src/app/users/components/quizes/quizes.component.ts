import { Component, OnInit } from '@angular/core';
import { quiz } from 'src/app/interfaces/quiz';
import { QuizService } from 'src/app/services/quiz.service'
import { ActivatedRoute, ParamMap, Router, ActivationEnd } from '@angular/router';
import { user } from 'src/app/interfaces/user';
import { quizResult } from 'src/app/interfaces/quiz_result';

@Component({
  selector: 'app-quizes',
  templateUrl: './quizes.component.html',
  styleUrls: ['./quizes.component.scss']
})
export class QuizesComponent implements OnInit {

  data: quiz[] = [];
  id: any;
  catId: any;
  quizName = '';

  users: user[] = [];
  user: user | undefined;

  // getting the id of user from local storage
  user_id: any = localStorage.getItem("user_id");

  // An array to store all the quiz Result
  quizResults: quizResult[] = [];

  // variable to store an specific quiz Result field
  specificQuizResult: quizResult | undefined;

  constructor(private quizservice: QuizService, private route: ActivatedRoute, private router: Router) {
    this.router.events.subscribe(e => {
      if (e instanceof ActivationEnd && e.snapshot?.params?.id) {
        // debugger;
        this.id = e.snapshot.paramMap.get('id');
        // console.log(" from quizzes constr id : ", this.id)

        this.sendId();

      }
    });
  }



  ngOnInit(): void {
    //this was for getting all data
    // this.quizservice.getquizes().subscribe((ret:any[])=>{
    //   console.log(ret);
    //   this.data = ret;
    // })
  }

  //getting quiz by id
  sendId() {
    this.catId = this.id
    // console.log(" inside sendID() cat ID : ", this.id);

    this.quizservice.getquizesbyid(this.catId).subscribe((ret: any[]) => {

      // console.log(" Send Id ", ret);
      this.data = ret;

    })
  }

  submit(quiz_id: number) {

    // console.log(quiz_id);

    // console.log(this.user_id);
    this.user = this.users.find((m) => m.user_id == this.user_id);
    this.specificQuizResult = this.quizResults.find((m) => m.user_id == this.id);

    console.log(this.user);
    console.log(this.specificQuizResult);

    this.quizservice.sendEmail("http://localhost:8080/api/quizeresult/sendmail", this.user, this.specificQuizResult).subscribe(
      data => {
        let res: any = data;
        // console.log(`mail has been sent succesfully to ${this.user?.email} email Id. `);
      },
      err => {
        console.log(err);

      }
    );

  }

  searchByTitle(): void {
    this.quizservice.getquizeByTitle(this.quizName).subscribe((ret: any[]) => {
      // console.log(ret);
      this.data = ret;
    })
  }
  OnInput(event: any) {
    this.quizName = event.target.value;
  }

}
