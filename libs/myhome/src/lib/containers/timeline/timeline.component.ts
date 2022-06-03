import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'united-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  timestamp: Date = new Date();

  constructor() {
    console.log('TimelineComponent - constructor');
  }

  ngOnInit(): void {
    console.log('TimelineComponent - ngOnInit');
  }

  ionViewDidEnter() {
    console.log('TimelineComponent - ionViewDidEnter');
    this.timestamp = new Date();
  }
}
