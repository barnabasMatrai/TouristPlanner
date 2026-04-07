import { Injectable, computed, inject } from '@angular/core';
import { TourViewModel } from './tour.vm';

@Injectable()
export class TourLogListViewModel {
  private tourVm = inject(TourViewModel);

  logsForTour = (tourId: number) =>
    computed(() => this.tourVm.getLogsForTour(tourId));

  deleteLog(tourId: number, logId: number) {
    this.tourVm.deleteLogForTour(tourId, logId);
  }
}