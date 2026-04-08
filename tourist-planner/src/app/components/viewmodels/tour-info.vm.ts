import { computed, Injectable, signal, inject } from '@angular/core';
import { TourViewModel } from './tour.vm';

@Injectable()
export class TourInfoViewModel {
  tourVm = inject(TourViewModel);
}
