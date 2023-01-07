import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-roadmap-statistics',
  templateUrl: './roadmap-statistics.component.html',
  styleUrls: ['./roadmap-statistics.component.scss']
})
export class RoadmapStatisticsComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
