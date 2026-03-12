import { computed, Injectable, signal } from '@angular/core';
import { Tour } from '../models/tour';

@Injectable()
export class TourViewModel {
  tours = signal<Array<Tour>>([]);
  selectedTour = signal<Tour | null>(null);

  selectTour(tour: Tour) {
    this.selectedTour.set(tour);
  }
}