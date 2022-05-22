import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'united-logic',
  templateUrl: './logic.component.html',
  styleUrls: ['./logic.component.css'],
})
export class LogicComponent implements OnInit {
  ngOnInit(): void {
    console.log('LogicComponent');
  }
}
