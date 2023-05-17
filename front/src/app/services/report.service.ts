import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report, ReportInput } from '../models/report.model';

const baseUrl = 'http://localhost:8080/api/reports';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Report[]> {
    return this.http.get<Report[]>(baseUrl);
  }

  get(id: any): Observable<Report> {
    return this.http.get<Report>(`${baseUrl}/${id}`);
  }

  create(data: ReportInput): Observable<Report> {
    return this.http.post<Report>(baseUrl, data);
  }

  update(id: number, data: ReportInput): Observable<Report> {
    return this.http.put<Report>(`${baseUrl}/${id}`, data);
  }
}