import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { puzzle } from 'src/app/classes/puzzles';
//import { puzzle } from 'src/app/interfaces/puzzle';
import { PuzzlesService } from 'src/app/services/puzzles.service';
import { Label } from 'ng2-charts';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-puzzles',
  templateUrl: './puzzles.component.html',
  styleUrls: ['./puzzles.component.scss'],
})
export class PuzzlesComponent implements OnInit {
  puzzles: puzzle[] = [];
  puzzle!: puzzle;
  newdata: any = [];
  score: any = [];
  nlength: number = 0;

  addPuzzleClicked: boolean = false;

  constructor(private puzzleService: PuzzlesService, private route: Router) {}

  ngOnInit(): void {
    this.puzzleService.getPuzzles().subscribe((ret: any[]) => {
      //console.log(ret);
      this.puzzles = ret;
    });

    this.puzzleService.getTopScore().subscribe((res) => {
      this.newdata = res;
      console.log(this.newdata);
      this.nlength = this.newdata.length;
      console.log(this.newdata[0].score);
      for (let i = 0; i < this.nlength; i++) {
        this.barChartLables.push(this.newdata[i].first_name);
        this.score.push(this.newdata[i].score);
      }
      // console.log("this.score", this.score);
      // console.log("this.barChartLables", this.barChartLables);
    });
  }
  addpuzzle() {
    console.log(this.puzzle);
    this.puzzleService.postData(this.puzzle).subscribe((reponse) => {
      //console.log(reponse);
      this.route.navigate(['admin']);
    });
  }
  public barChartOptions: ChartOptions = { responsive: true };
  public barChartLables: Label[] = [];
  public barChartType: ChartType = 'doughnut';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    {
      //data: []=this.score, label: 'puzzles',
      data: ([] = this.score),
      label: 'puzzles',
      backgroundColor: ['#0074D9', '#FF4136', '#2ECC40', '#FF851B'],
    },
  ];

  addPuzzleClick() {
    this.addPuzzleClicked = !this.addPuzzleClicked;
  }
}
