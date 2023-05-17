import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Report, ReportInput } from 'src/app/models/report.model';
import { Sexe } from '../../models/sexe.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Observation } from '../../models/observations.model';
import { ObservationService } from '../../services/observation.service';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportDetailsComponent implements OnInit, OnDestroy {

  public currentReport: Report = {}
  public message: string;
  public sexe = Sexe;
  public observations: Observation[];
  public dropdownSettings = {};

  private notifier = new Subject();

  constructor(
    private reportService: ReportService,
    private route: ActivatedRoute,
    private readonly changeDetector: ChangeDetectorRef,
    private observationService: ObservationService,
    private router: Router) { 
    }

  ngOnInit(): void {
    this.message = '';
    this.dropdownSettings = {
      idField: 'id',
      textField: 'name',
    };
    this.getReport(this.route.snapshot.params.id);
    this.getObservations();
  }

  private getObservations(): void {
    this.observationService.getAll()
    .pipe(takeUntil(this.notifier))
    .subscribe((observations: Observation[]) => {
      this.observations = observations;
      this.changeDetector.markForCheck();
    });
  }


  getReport(id: string): void {
    this.reportService.get(id)
    .pipe(takeUntil(this.notifier))
      .subscribe(
        data => {
          this.currentReport = data;
          this.changeDetector.markForCheck();
        },
        error => {
          console.log(error);
        });
  }

  updateReport(): void {
    this.message = '';
    const reportInput: ReportInput = {
      report : {
        author: this.currentReport.author,
        productCode: this.currentReport.productCode,
        observations: this.currentReport.observations.map(obs => obs.id),
        description: this.currentReport.description,
      }
    }

    this.reportService.update(this.currentReport.id, reportInput)
    .pipe(takeUntil(this.notifier))
      .subscribe(
        (response: any) => {
          this.message = response.message ? response.message : 'This report was updated successfully!';
          this.changeDetector.markForCheck();
        },
        error => {
          console.log(error);
        });
  }
  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}