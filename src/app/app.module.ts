import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTableComponent } from './shared/data-table/data-table.component';
import { DailogComponent } from './shared/dailog/dailog.component';

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    DailogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
