import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CounterEffects } from './+state/counter.effects';
import { counterReducer, FEATURE_KEY } from './+state/counter.reducer';
import { MyCounterComponent } from './my-counter/my-counter.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(FEATURE_KEY, counterReducer),
    EffectsModule.forFeature([CounterEffects]),
  ],
  exports: [MyCounterComponent],
  declarations: [MyCounterComponent],
})
export class CounterModule {}
