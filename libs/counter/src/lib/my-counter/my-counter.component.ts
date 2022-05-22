import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../+state/counter.actions';
import { selectFeatureCount } from './../+state/counter.selectors';

@Component({
  selector: 'united-my-counter',
  templateUrl: './my-counter.component.html',
  styleUrls: ['./my-counter.component.css'],
})
export class MyCounterComponent {
  // count$: Observable<number>;
  count = 0;

  constructor(private store: Store) {
    store.select(selectFeatureCount).subscribe((cnt) => {
      console.log(cnt);
      this.count = cnt;
    });
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
}
