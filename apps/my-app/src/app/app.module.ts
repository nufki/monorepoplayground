import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LogicComponent } from './logic/logic.component';
import { MyLibModule } from '@united/my-lib';

@NgModule({
  declarations: [AppComponent, LogicComponent],
  imports: [BrowserModule, MyLibModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
