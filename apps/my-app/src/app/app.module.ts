import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LogicComponent } from './logic/logic.component';
import { MyLibModule } from '@united/my-lib';
import { CommentsViewComponent } from './comments-view/comments-view.component';

@NgModule({
  declarations: [AppComponent, LogicComponent, CommentsViewComponent],
  imports: [BrowserModule, MyLibModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
