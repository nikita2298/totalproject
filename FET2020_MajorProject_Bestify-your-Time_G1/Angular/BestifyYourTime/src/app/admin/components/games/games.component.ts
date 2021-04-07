import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  newdata: any[] = [];
  piedata: any[] = [];



  scorers: any[] = [];
  scores: number[] = [];
  mailers: any[] = [];
  // data:category[]=[];

  games: any[] = [];
  count: number[] = [];

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = this.scorers;
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [] = this.scores, label: 'Top scorer' }
    // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [["Snake"], ["Tetris"]];
  public pieChartData: SingleDataSet = this.count;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public chartColors: any[] = [
    {
      backgroundColor: ["#FF7360", "#6FC8CE"]
    }];
  public pieChartPlugins = [];

  constructor(private gamesservice: GamesService) {
    monkeyPatchChartJsLegend();
    monkeyPatchChartJsTooltip();

  }

  ngOnInit(): void {


    this.gamesservice.getTopScorer().subscribe((ret: any[]) => {
      console.log(ret);
      this.newdata = ret;
      console.log("this.newData", this.newdata);
      console.log(this.newdata.length);

      for (let i = 0; i < this.newdata.length; i++) {
        // this.barChartLabels.push(this.newdata[i].user_id);
        this.scorers.push(this.newdata[i].first_name);
        this.scores.push(this.newdata[i].score);
        this.mailers.push(this.newdata[i].email);
      }

    })

    // this.nlegth=this.newdata.length;

    this.gamesservice.getPieGame().subscribe((ret: any[]) => {
      console.log(ret);
      this.piedata = ret;
      console.log("this.piedata", this.piedata);

      console.log(this.piedata.length);

      for (let i = 0; i < this.piedata.length; i++) {
        // this.barChartLabels.push(this.newdata[i].user_id);
        //  this.pieChartLabels.push(this.piedata[i].game_name);
        this.count.push(this.piedata[i].Count);
      }

    })


  }

  mail() {
    this.gamesservice.mail("http://localhost:8080/api/scores/mail", this.mailers).subscribe(
      data => {
        let res: any = data;
        // console.log(`mail has been sent succesfully to ${this.data.email} email Id. `);      
      },
      err => {
        console.log(err);

      }
    );
  }

}
