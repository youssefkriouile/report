import { Component, OnInit } from '@angular/core';
import { Report } from '../../models/report.model';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.css']
})
export class ReportsListComponent implements OnInit {

  reports?: Report[];
  currentReport: Report = {};
  currentIndex = -1;
  title = '';

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.retrieveReports();
  }

  retrieveReports(): void {
    this.reportService.getAll()
      .subscribe(
        data => {
          this.reports = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveReports();
    this.currentReport = {};
    this.currentIndex = -1;
  }

  setActiveReport(report: Report, index: number): void {
    this.currentReport = report;
    this.currentIndex = index;
  }
}