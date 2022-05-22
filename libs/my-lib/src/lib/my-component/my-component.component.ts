import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'united-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css'],
})
export class MyComponentComponent implements OnInit {
  status = 'on';

  ngOnInit(): void {
    console.log('ngOnInit: MyComponentComponent');
  }
}
