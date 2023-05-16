import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsListComponent } from './components/reports-list/reports-lit.component';

const routes: Routes = [
  { path: '', redirectTo: 'reports', pathMatch: 'full'},
  { path: 'reports', component: ReportsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
