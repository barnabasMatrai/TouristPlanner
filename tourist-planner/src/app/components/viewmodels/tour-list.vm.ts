import { computed, Injectable, signal, inject } from '@angular/core';
import { Tour } from '../models/tour';
import { TourViewModel } from './tour.vm';

@Injectable()
export class TourListViewModel {
  tourVm = inject(TourViewModel);

  addTour() {
    let tour = new Tour(
      this.tourVm.tours().length + 1, "test", "test",
      {
        from: "from", to: "to", transportType: "transportType",
        routeInformation: "routeInformation"
      },
      {
        distanceKm: 1,
        estimatedTimeMinutes: 30
      }
    );
    tour.name = "Tour" + tour.id;
    this.tourVm.tours.update((tours) => [...tours, tour]);
  }
}