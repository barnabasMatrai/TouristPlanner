import { computed, Injectable, signal } from '@angular/core';
import { Tour } from '../models/tour';

@Injectable()
export class TourViewModel {
  tours = signal<Array<Tour>>([]);
  selectedTourId = signal<number | null>(null);
  
  selectedTour = computed<Tour | null>(() => {
    const id = this.selectedTourId();
    console.log(id);
    return this.tours().find(t => t.id === id) ?? null;
  });

  selectTour(id: number) {
    this.selectedTourId.set(id);
  }
}
