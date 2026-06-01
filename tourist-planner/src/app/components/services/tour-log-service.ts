import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TourLog } from '../models/tour';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TourLogService {

  private readonly apiUrl = `${environment.apiUrl}/tours`;

  constructor(private readonly http: HttpClient) {}

  getAll(tourId: number): Observable<TourLog[]> {
    return this.http.get<TourLog[]>(
      `${this.apiUrl}/${tourId}/tourlogs`
    );
  }

  get(tourId: number, tourLogId: number): Observable<TourLog> {
    return this.http.get<TourLog>(
      `${this.apiUrl}/${tourId}/tourlogs/${tourLogId}`
    );
  }

  create(tourId: number, tourLog: TourLog): Observable<TourLog> {
    return this.http.post<TourLog>(
      `${this.apiUrl}/${tourId}/tourlogs`,
      tourLog
    );
  }

  update(
    tourId: number,
    tourLogId: number,
    tourLog: TourLog
  ): Observable<TourLog> {
    return this.http.put<TourLog>(
      `${this.apiUrl}/${tourId}/tourlogs/${tourLogId}`,
      tourLog
    );
  }

  delete(tourId: number, tourLogId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${tourId}/tourlogs/${tourLogId}`
    );
  }
}