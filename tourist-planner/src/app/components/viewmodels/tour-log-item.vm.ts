import { Injectable, inject } from '@angular/core';
import { TourViewModel } from './tour.vm';
import { TourLogCreateViewModel } from './tour-log-create.vm';
import { TourLog } from '../models/tour';

@Injectable()
export class TourLogItemViewModel {
  private tourVm = inject(TourViewModel);
  private formVm = inject(TourLogCreateViewModel);

  edit(log: TourLog) {
    this.formVm.startEdit(log);
  }

  delete(tourId: number, logId: number) {
    this.tourVm.deleteLogForTour(tourId, logId);
  }
}