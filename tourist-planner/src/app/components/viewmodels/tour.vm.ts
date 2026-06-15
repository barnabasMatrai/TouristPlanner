import { computed, Injectable, signal } from '@angular/core';
import { Tour, TourLog } from '../models/tour';
import { TourService } from '../services/tour-service';
import { TourLogService } from '../services/tour-log-service';
import { handleRequest } from '../../helpers/request.helper';

@Injectable()
export class TourViewModel {

  constructor(
    private readonly tourService: TourService,
    private readonly tourLogService: TourLogService
  ) {
    this.loadTours();
  }

  tours = signal<Tour[]>([]);
  selectedTourId = signal<number | null>(null);
  showForm = signal<boolean>(false);
  showSearch = signal<boolean>(false);

  tourLogs = signal<Record<number, TourLog[]>>({});

  selectedTour = computed(() => {
    const id = this.selectedTourId();
    return this.findTourById(id);
  });

  private findTourById(id: number | null): Tour | null {
    if (id === null) return null;
    return this.tours().find(t => t.id === id) ?? null;
  }

  // -------------------------
  // TOURS
  // -------------------------

  private loadTours() {
    handleRequest(
      this.tourService.getAll(),
      (tours: Tour[]) => this.tours.set(tours)
    );
  }

  selectTour(id: number) {
    handleRequest(
      this.tourService.get(id),
      (tour: Tour) => {
        this.selectedTourId.set(tour.id);

        this.tours.update(tours =>
          tours.map(t =>
            t.id === tour.id ? tour : t
          )
        );

        this.showForm.set(false);
        this.showSearch.set(false);

        this.loadLogsForTour(tour.id);
      }
    );
  }

  createTour(tour: Tour) {
    handleRequest(
      this.tourService.create(tour),
      (createdTour) => {
        this.tours.update(tours => [...tours, createdTour]);
        this.showForm.set(false);
      }
    );
  }

  updateTour(tour: Tour) {
    handleRequest(
      this.tourService.update(tour.id, tour),
      (updatedTour: Tour) => {
        this.tours.update(current =>
          current.map(t => t.id === updatedTour.id ? updatedTour : t)
        );

        this.showForm.set(false);
      }
    );
  }

  deleteTour(id: number | null) {
    if (id === null) return;

    handleRequest(
      this.tourService.delete(id),
      () => {
        this.tours.update(current => current.filter(t => t.id !== id));

        if (this.selectedTourId() === id) {
          this.selectedTourId.set(null);
        }
      }
    );
  }

  // -------------------------
  // TOUR LOGS
  // -------------------------

  private loadLogsForTour(tourId: number) {
    handleRequest(
      this.tourLogService.getAll(tourId),
      (logs: TourLog[]) => {
        this.setLogsForTour(tourId, logs);
      }
    );
  }

  getLogsForTour(tourId: number): TourLog[] {
    return this.tourLogs()[tourId] ?? [];
  }

  private setLogsForTour(tourId: number, logs: TourLog[]) {
    this.tourLogs.update(state => ({
      ...state,
      [tourId]: logs
    }));
  }

  addLogForTour(log: Omit<TourLog, 'id'>) {
    handleRequest(
      this.tourLogService.create(log.tourId, log as TourLog),
      (createdLog) => {
        const logs = this.getLogsForTour(log.tourId);
        this.setLogsForTour(log.tourId, [...logs, createdLog]);
      }
    );
  }

  updateLogForTour(updated: TourLog) {
    handleRequest(
      this.tourLogService.update(updated.tourId, updated.id, updated),
      (savedLog) => {
        const logs = this.getLogsForTour(savedLog.tourId);

        this.setLogsForTour(
          savedLog.tourId,
          logs.map(l => l.id === savedLog.id ? savedLog : l)
        );
      }
    );
  }

  deleteLogForTour(tourId: number, logId: number) {
    handleRequest(
      this.tourLogService.delete(tourId, logId),
      () => {
        const logs = this.getLogsForTour(tourId);

        this.setLogsForTour(
          tourId,
          logs.filter(l => l.id !== logId)
        );
      }
    );
  }
}
