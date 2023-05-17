import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsListComponent } from './components/reports-list/reports-lit.component';
import { ReportDetailsComponent } from './components/report-details/report-details.component';
import { AddReportComponent } from './components/add-report/add-report.component';

const routes: Routes = [
  { path: '', redirectTo: 'reports', pathMatch: 'full'},
  { path: 'reports', component: ReportsListComponent },
  { path: 'reports/:id', component: ReportDetailsComponent },
  { path: 'add', component: AddReportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
