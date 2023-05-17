import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Report } from '../../models/report.model';
import { ReportService } from 'src/app/services/report.service'; 
import { ObservationService } from '../../services/observation.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsListComponent implements OnInit, OnDestroy {

  public reports?: Report[];
  public currentReport: Report = {};
  public currentIndex = -1;
  private notifier = new Subject();

  constructor(
    private reportService: ReportService, 
    private observationService: ObservationService,
    private readonly changeDetector: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.retrieveReports();
  }

  retrieveReports(): void {
    this.reportService.getAll()
    .pipe(takeUntil(this.notifier))
      .subscribe(
        (reports) => {
          this.reports = reports;
          this.changeDetector.markForCheck();
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

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}