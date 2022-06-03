import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'united-instrument',
  templateUrl: './instrument.component.html',
  styleUrls: ['./instrument.component.scss'],
})
export class InstrumentComponent implements OnInit {
  instrumentSymbol = 'TSLA';

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
