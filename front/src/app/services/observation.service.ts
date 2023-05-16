import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../models/report.model';
import { Observation } from '../models/observations.model';

const baseUrl = 'http://localhost:8080/api/observations';

@Injectable({
  providedIn: 'root'
})
export class ObservationService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Observation[]> {
    return this.http.get<Observation[]>(baseUrl);
  }
}