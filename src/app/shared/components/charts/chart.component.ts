// import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
// import { ChartDataset, ChartOptions, ChartType, Color } from "chart.js";

// @Component({
//   selector: "app-chart",
//   templateUrl: "./chart.component.html",
//   styleUrls: ["./chart.component.scss"],
// })
// export class ChartComponent implements OnInit {
//   public chartOptions: any;
//   public chartLegend = true;

//   @Input() chartColors: any[];
//   @Input() chartType: ChartType;
//   @Input() chartData: any[];
//   @Input() chartLabels: string[];

//   constructor() {}

//   ngOnInit() {}

//   ngOnChanges(changes: SimpleChanges) {
//     if (
//       changes.chartData &&
//       changes.chartData.currentValue != changes.chartData.previousValue
//     ) {
//       console.log();
//       this.chartOptions = {
//         responsive: true,
//         devicePixelRatio: 2,
//         elements: {
//           line: {
//             tension: 0.5,
//           },
//         },
//       };
//       for (let [index, dataset] of this.chartData.entries()) {
//         Object.keys(this.chartColors[index]).forEach((key: any) => {
//           dataset[key] = this.chartColors[index][key];
//         });
//         Object.keys(this.chartOptions).forEach((key: any) => {
//           dataset[key] = this.chartOptions[key];
//           dataset["fill"] = "origin";
//         });
//       }
//     }
//   }
// }
