import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tour } from '../models/tour';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  private readonly apiUrl = `${environment.apiUrl}/tours`;

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.apiUrl);
  }

  get(id: number): Observable<Tour> {
    return this.http.get<Tour>(`${this.apiUrl}/${id}`);
  }

  create(tour: Tour): Observable<Tour> {
    return this.http.post<Tour>(this.apiUrl, tour);
  }

  update(id: number | null, tour: Tour): Observable<Tour> {
    return this.http.put<Tour>(`${this.apiUrl}/${id}`, tour);
  }

  delete(id: number | null): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  export(id: number | null): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/${id}/export`);
  }
}