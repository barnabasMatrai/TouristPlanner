import { computed, Injectable, signal, inject } from '@angular/core';
import { Tour } from '../models/tour';
import { TourViewModel } from './tour.vm';

@Injectable()
export class TourInfoViewModel {
  tourVm = inject(TourViewModel);

  tour: Tour | null = null;
}