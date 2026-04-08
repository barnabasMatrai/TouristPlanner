import { computed, Injectable, signal } from '@angular/core';
import { Tour, TourLog } from '../models/tour';

@Injectable()
export class TourViewModel {
  tours = signal<Array<Tour>>([]);
  selectedTourId = signal<number | null>(null);
  tourLogs = signal<Record<number, Array<TourLog>>>({});
  nextTourLogId = signal<number>(1);
  
  selectedTour = computed<Tour | null>(() => {
    const id = this.selectedTourId();
    return this.tours().find(t => t.id === id) ?? null;
  });

  selectTour(id: number) {
    this.selectedTourId.set(id);
    this.showForm.set(false);
  }

  showForm = signal<boolean>(false);

  getLogsForTour(tourId: number): Array<TourLog> {
    return this.tourLogs()[tourId] ?? [];
  }

  addLogForTour(log: Omit<TourLog, 'id'>) {
    const logWithId: TourLog = {
      ...log,
      id: this.nextTourLogId()
    };

    this.nextTourLogId.update(current => current + 1);
    this.tourLogs.update(currentLogs => ({
      ...currentLogs,
      [log.tourId]: [...(currentLogs[log.tourId] ?? []), logWithId]
    }));
  }

  updateLogForTour(updatedLog: TourLog) {
    this.tourLogs.update(currentLogs => ({
      ...currentLogs,
      [updatedLog.tourId]: (currentLogs[updatedLog.tourId] ?? []).map(log =>
        log.id === updatedLog.id ? updatedLog : log
      )
    }));
  }

  deleteLogForTour(tourId: number, logId: number) {
    this.tourLogs.update(currentLogs => ({
      ...currentLogs,
      [tourId]: (currentLogs[tourId] ?? []).filter(log => log.id !== logId)
    }));
  }
}
