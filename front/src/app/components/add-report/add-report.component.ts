import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Report, ReportInput } from 'src/app/models/report.model';
import { Observation } from 'src/app/models/observations.model';
import { ReportService } from 'src/app/services/report.service';
import { ObservationService } from '../../services/observation.service';
import { DatePipe } from '@angular/common';
import { Sexe } from '../../models/sexe.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css'], 
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddReportComponent implements OnInit, OnDestroy {

  private notifier= new Subject();

  public report: Report = {
    author:{
        firstName:'',
        lastName:'',
        birthDate:null,
        sexe:null,
        email: '',
    },
    description: '',
    productCode: '',
    observations: null
  };
  public submitted = false;
  public observations: Observation[];
  public dropdownSettings = {};
  public sexe = Sexe;

  constructor(
    private reportService: ReportService, 
    private observationService: ObservationService, 
    private datePipe: DatePipe,
    private readonly changeDetector: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.dropdownSettings = {
      idField: 'id',
      textField: 'name',
    };
   this.getObservations();
  }

  private getObservations(): void {
    this.observationService.getAll().subscribe((observations: Observation[]) => {
      this.observations = observations;
      this.changeDetector.markForCheck();
    });
  }

  public saveReport(): void {
    const birthdate: string = this.datePipe.transform(this.report.author.birthDate, 'yyyy-MM-dd');
    const data: ReportInput = {
      report : {
        author: {
            firstName: this.report.author.firstName,
            lastName: this.report.author.lastName,
            birthDate: birthdate,
            sexe: this.report.author.sexe,
            email: this.report.author.email
        },
      description: this.report.description,
      productCode: this.report.productCode,
      observations: this.report.observations.map(obs => obs.id),
    }
  };

   this.createReport(data);
  }

  private createReport(data: ReportInput): void {
    this.reportService.create(data)
    .pipe(takeUntil(this.notifier))
      .subscribe(
        response => {
          this.submitted = true;
          this.changeDetector.markForCheck();
        },
        error => {
          console.log(error);
        });
  }

  public newReport(): void {
    this.submitted = false;
    this.report = {
        author:{
            firstName:'',
            lastName:'',
            birthDate:null,
            sexe:null,
            email: '',
        },
        description: '',
        productCode: '',
        observations: null
      };
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

}