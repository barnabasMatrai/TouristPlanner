import { computed, Injectable, signal, inject } from '@angular/core';
import { Tour } from '../models/tour';
import { TourViewModel } from './tour.vm';

@Injectable()
export class TourListViewModel {
  tourVm = inject(TourViewModel);

  addTour() {
    let tour = new Tour(
      "test", "test",
      {
        from: "from", to: "to", transportType: "transportType",
        routeInformation: "routeInformation"
      },
      {
        distanceKm: 1,
        estimatedTimeMinutes: 30
      }
    );
    tour.name = "Tour" + (this.tourVm.tours().length + 1);
    this.tourVm.tours.update((tours) => [...tours, tour]);
  }

  isTourSelected(tour: Tour) {
    return tour === this.tourVm.selectedTour() ? "background-color:powderblue;" : "background-color:red;";
  }

  selectTour(tour: Tour) {
    this.tourVm.selectedTour.set(tour);
  }
}