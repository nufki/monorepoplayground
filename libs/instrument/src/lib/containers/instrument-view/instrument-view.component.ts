import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'united-instrument-view',
  templateUrl: './instrument-view.component.html',
  styleUrls: ['./instrument-view.component.css'],
})
export class InstrumentViewComponent implements OnInit {
  instrumentSymbol = 'TSLA';

  constructor() {}

  ngOnInit(): void {}
}
