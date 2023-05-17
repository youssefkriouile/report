import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportsListComponent } from './components/reports-list/reports-lit.component';
import { ReportDetailsComponent } from './components/report-details/report-details.component';
import { AddReportComponent } from './components/add-report/add-report.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ReportsListComponent,
    ReportDetailsComponent,
    AddReportComponent
  ],
  imports: [
    BrowserModule,  
    AppRoutingModule,
    FormsModule, 
    HttpClientModule, BrowserAnimationsModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
