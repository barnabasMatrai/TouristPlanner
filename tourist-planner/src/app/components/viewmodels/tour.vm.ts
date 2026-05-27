import { computed, Injectable, signal } from '@angular/core';
import { Tour, TourLog } from '../models/tour';
import { TourService } from '../services/tour-service';
import { HttpErrorResponse } from '@angular/common/http';
import { handleRequest } from '../../helpers/request.helper';

@Injectable()
export class TourViewModel {

  constructor(private readonly tourService: TourService) {
    this.loadTours();
  }

  tours = signal<Tour[]>([]);
  selectedTourId = signal<number | null>(null);
  showForm = signal<boolean>(false);

  tourLogs = signal<Record<number, TourLog[]>>({});
  nextTourLogId = signal<number>(1);

  selectedTour = computed(() => {
    const id = this.selectedTourId();
    return this.findTourById(id);
  });

  private findTourById(id: number | null): Tour | null {
    if (id === null) return null;
    return this.tours().find(t => t.id === id) ?? null;
  }

  private loadTours() {
    handleRequest(
      this.tourService.getAll(),
      (tours: Tour[]) => this.tours.set(tours)
    );
  }

  selectTour(id: number) {
    this.selectedTourId.set(id);
    this.showForm.set(false);
  }

  createTour(tour: Tour) {
    handleRequest(
      this.tourService.create(tour),
      (createdTour) => {
        console.log('Tour created:', createdTour);
        this.tours.update(tours => [...tours, createdTour]);
      }
    );
  }

  updateTour(tour: Tour) {
    this.tourService.update(tour.id, tour).subscribe({
      next: (updated: Tour) => {
        this.tours.update(current =>
          current.map(t => t.id === updated.id ? updated : t)
        );
      },
      error: (err: HttpErrorResponse) => console.error('Failed to update tour', err)
    });
  }

  deleteTour(id: number) {
    this.tourService.delete(id).subscribe({
      next: () => {
        this.tours.update(current => current.filter(t => t.id !== id));

        if (this.selectedTourId() === id) {
          this.selectedTourId.set(null);
        }
      },
      error: (err: HttpErrorResponse) => console.error('Failed to delete tour', err)
    });
  }

  getLogsForTour(tourId: number): TourLog[] {
    return this.tourLogs()[tourId] ?? [];
  }

  private getNextLogId(): number {
    const id = this.nextTourLogId();
    this.nextTourLogId.set(id + 1);
    return id;
  }

  private setLogsForTour(tourId: number, logs: TourLog[]) {
    this.tourLogs.update(state => ({
      ...state,
      [tourId]: logs
    }));
  }

  addLogForTour(log: Omit<TourLog, 'id'>) {
    const newLog: TourLog = {
      ...log,
      id: this.getNextLogId()
    };

    const logs = this.getLogsForTour(log.tourId);
    this.setLogsForTour(log.tourId, [...logs, newLog]);
  }

  updateLogForTour(updated: TourLog) {
    const logs = this.getLogsForTour(updated.tourId);

    const updatedLogs = logs.map(log =>
      log.id === updated.id ? updated : log
    );

    this.setLogsForTour(updated.tourId, updatedLogs);
  }

  deleteLogForTour(tourId: number, logId: number) {
    const logs = this.getLogsForTour(tourId);

    const filteredLogs = logs.filter(log => log.id !== logId);

    this.setLogsForTour(tourId, filteredLogs);
  }
}
