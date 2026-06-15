import { Injectable, signal, computed, inject } from '@angular/core';
import { TourViewModel } from './tour.vm';
import { Tour } from '../models/tour';

@Injectable()
export class SearchViewModel {
  tourVm = inject(TourViewModel);

  query = signal('');

  setQuery(query: string) {
    this.query.set(query);
  }

  filteredTours = computed<Tour[]>(() => {

    const query = this.query().toLowerCase();

    if (!query) {
      return this.tourVm.tours();
    }

    return this.tourVm.tours().filter(tour =>
      tour.name.toLowerCase().includes(query) ||
      tour.description.toLowerCase().includes(query) ||
      this.tourVm.getLogsForTour(tour.id)
        .some(log =>
        log.comment.toLowerCase().includes(query)
      )
    );
  });
}