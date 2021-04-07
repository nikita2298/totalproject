import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Quiz } from 'src/app/classes/Quiz';
import { QuizDataService } from 'src/app/services/quiz-data.service';
import { FavouriteService } from 'src/app/services/favourite.service';
import { QuizeResult } from 'src/app/classes/QuizeResult';
import { State } from 'src/app/classes/State';
import {  ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { QuizService } from 'src/app/services/quiz.service';
import { user } from 'src/app/interfaces/user';

@Component({
  selector: 'app-quiz-display',
  templateUrl: './quiz-display.component.html',
  styleUrls: ['./quiz-display.component.scss'],
})
export class QuizDisplayComponent implements OnInit {
  @ViewChild('timer')
  timerDiv: ElementRef = {} as ElementRef;

  timer: any;

  showQuestions: boolean = false;

  quizResult: any;
  quiz: Quiz = {} as Quiz;

  quidID: number;
  userID: number;
  cat_id: number = 0;

  isFav: boolean = false;

  mainButtonText: string;
  disableMainButton: boolean = true;

  pausedTime: number = -1;
  timeString: string = '';

  data: user = this.tokenService.getUser();

  // User modal show variables;
  hasPreviousQuizResult: boolean = false;

  // Modal variables
  showModal: boolean = false;
  modalHeader: string = '';
  modalBody: string = '';

  constructor(
    public quizDataService: QuizDataService,
    private favservice: FavouriteService,
    private route: ActivatedRoute,
    private tokenService: TokenStorageService,
    private quizService: QuizService
  ) {
    this.quidID = this.route.snapshot.params.id;
    this.userID = tokenService.getUser().user_id;
    this.mainButtonText = 'Start Quiz';
  }

  ngOnInit(): void {
    this.quizDataService.getQuiz(this.quidID).subscribe((data: any) => {
      // console.log("GOT quiz -> ",data);
      this.quiz = data;
      this.cat_id = this.quiz.quiz_cat_id;
      this.timeString = this.getTimeInHMSFormat(this.quiz.quiz_time);
      this.getPreviousQuizResult();
    });

    this.favservice
      .getFavourite(this.quidID, this.userID)
      .subscribe((data: any) => {
        // console.log("Favorite data ->",data);
        if (data !== null && data[0].length !== 0 && data[0][0].status === 1)
          this.isFav = true;
      });
  }

  getPreviousQuizResult() {
    this.quizDataService
      .getQuizeResult(this.quidID, this.userID)
      .subscribe((data: any) => {
        // console.log("got quiz result -> ",data);
        if (data !== null && data[0].length !== 0) {
          this.quizResult = data[0][0];
          this.hasPreviousQuizResult = true;
          // console.log("Previous quiz result found = ",this.quizResult);
        } else {
          this.quizResult = new QuizeResult(this.userID, this.quidID);
          this.hasPreviousQuizResult = false;
          // console.log("No previous quiz result found");
        }
        this.getSavedState();
      });
  }

  getSavedState() {
    this.quizDataService
      .getState(this.quidID, this.userID)
      .subscribe((data: any) => {
        console.log('State Data ->', data);
        //TODO : CHECK IF THIS WORKS : if(data[0][0].state_id!==undefined){
        if (data !== null && data[0].length !== 0) {
          this.quizDataService.state = data[0][0];

          if (this.quizDataService.state.automatic === 0) {
            this.showModalFunc(
              'Saved State Found',
              'Resume your quiz where you previously left off'
            );
          } else {
            this.showModalFunc(
              'Saved State Found',
              'Recovered from unexpected crash'
            );
          }
          // console.log("Previous state found -> "+ JSON.stringify(this.quizDataService.state));
        } else {
          let newState: State = new State(
            this.userID,
            this.quidID,
            this.cat_id
          );
          newState.initializeSaveData(this.quiz.questions.length);
          this.quizDataService.state = newState;

          if (this.hasPreviousQuizResult) {
            this.showModalFunc('Welcome Back', 'Retrying quiz');
          }
          // console.log("No previous state found");
        }

        this.disableMainButton = false;
        // this.quizDataService.state=this.quizDataService.state;
      });
  }

  ngAfterViewInit() {
    this.quizDataService.timerDiv = this.timerDiv;
  }

  onMainButtonClick() {
    if (this.mainButtonText === 'Start Quiz') {
      this.showQuestions = true;
      this.startTimer(this.getTime(), this.timerDiv);
      this.mainButtonText = 'Pause Quiz';
    } else if (this.mainButtonText === 'Pause Quiz') {
      this.showQuestions = false;
      this.quizDataService.postState(0);
      clearInterval(this.timer);
      let timerText = this.timerDiv.nativeElement.outerText;
      this.pausedTime =
        parseInt(timerText.substring(0, timerText.indexOf(':'))) * 60 +
        parseInt(timerText.substring(timerText.indexOf(':') + 1));
      this.timerDiv.nativeElement.innerHTML = '';
      this.mainButtonText = 'Resume Quiz';
    } else if (this.mainButtonText === 'Resume Quiz') {
      this.mainButtonText = 'Pause Quiz';
      this.startTimer(this.pausedTime, this.timerDiv);
      this.showQuestions = true;
    }
  }

  getTime(): number {
    if (this.quizDataService.state.timer !== -1)
      return this.quizDataService.state.timer;
    else return this.quiz.quiz_time;
  }

  startTimer(duration: number, timerDiv: ElementRef) {
    //console.log(duration);
    if (duration === 0) return;

    let timerDuration: number = duration;
    var minutes: string, seconds: string;
    let min: number,
      sec: number = 0;
    this.timer = setInterval(() => {
      if (timerDuration <= 0) {
        this.submitQuiz();
      }

      min = Math.floor(timerDuration / 60);
      sec = timerDuration % 60;

      minutes = min < 10 ? '0' + min : min.toString();
      seconds = sec < 10 ? '0' + sec : sec.toString();

      if (timerDuration != 0)
        timerDiv.nativeElement.innerHTML = minutes + ':' + seconds;

      --timerDuration;
    }, 1000);
  }

  calculateScore(): number {
    let score: number = 0;
    this.quizDataService.state.quiz.forEach((element: any) => {
      if (this.quiz.questions[element.quesId - 1].correctAnswer === element.ans)
        score += 1;
    });
    return score;
  }

  submitQuiz() {
    // console.log("Quiz submitted");
    clearInterval(this.timer);
    this.showQuestions = false;
    this.timerDiv.nativeElement.innerHTML = '';
    this.quizDataService.deleteState(this.quizDataService.state);
    this.setQuizResult();

    this.quizDataService.postQuizResult(this.quizResult);
    this.mailScore();
    this.mainButtonText = 'Quiz Submitted';
    this.showModalFunc('Quiz Submitted', 'Your score has been mailed to you');
  }

  // setting quiz_result fields
  setQuizResult() {
    let sc = this.calculateScore();
    this.quizResult.score = sc;
    this.quizResult.out_off = this.quiz.questions.length;
    if (sc < 0.6 * this.quiz.questions.length) this.quizResult.status = 0;
    else this.quizResult.status = 1;
    this.quizResult.date_played = new Date().toJSON().slice(0, 10);
  }

  mailScore() {
    console.log('Result -> ', this.quizResult);
    //  calling fuction to send mail
    this.quizService
      .sendEmail(
        'http://localhost:8080/api/quizeresult/sendmail',
        this.data,
        this.quizResult
      )
      .subscribe(
        (data) => {
          let res: any = data;
          console.log(
            `mail has been sent succesfully to ${this.data.email} email Id. `
          );
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onToggleFavButton(): void {
    this.isFav = !this.isFav;

    const fav = {
      activity_id: this.quidID,
      user_id: this.userID,
      status: this.isFav,
    };

    if (this.isFav == true) {
      this.favservice.insertFav(fav).subscribe((res) => {});
    } else {
      this.favservice.DeleteFav(this.quidID, this.userID).subscribe((res) => {
        // console.log(res);
      });
    }
  }

  getTimeInHMSFormat(time: number) {
    let h: number = time / 3600;
    let hours = Math.floor(h);
    let rem: number = time % 3600;
    let m: number = rem / 60;
    let min: number = Math.floor(m);
    let sec: number = rem % 60;
    // console.log(h,hours,m,min,sec);
    let str: string = '';

    if (hours === 0) {
      if (min === 0) {
        str = sec + ' sec';
      } else {
        str = min + ' min ' + sec + ' sec';
      }
    } else {
      str = hours + ' hr ' + min + ' min ' + sec + 'sec';
    }

    return str;
  }

  showModalFunc(heading: string, content: string) {
    this.modalHeader = heading;
    this.modalBody = content;
    this.showModal = true;
  }

  hideModalFunc() {
    // console.log("showmodal = false");
    this.showModal = false;
  }
}
