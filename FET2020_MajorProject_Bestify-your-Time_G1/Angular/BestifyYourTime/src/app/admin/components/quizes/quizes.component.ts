import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { quiz } from 'src/app/interfaces/quiz';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quizes',
  templateUrl: './quizes.component.html',
  styleUrls: ['./quizes.component.scss']
})
export class QuizesComponent implements OnInit {

  //variable for storing all the quizes
  data: quiz[] = [];

  //variable for storing filtered quizes
  // quiz: quiz[]=[];

  //variable to store fetched id from param
  id: any;

  catId: any;


  constructor(private quizservice: QuizService, private route: ActivatedRoute) {

    this.id = this.route.snapshot.params.id;
    this.sendId();

  }

  ngOnInit(): void {




  }

  //getting quiz by id
  sendId() {
    this.catId = this.id
    this.quizservice.getquizesbyid(this.catId).subscribe((ret: any[]) => {
      console.log(ret);
      this.data = ret;
    })
  }


}
