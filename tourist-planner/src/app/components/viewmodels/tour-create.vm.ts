import { computed, Injectable, signal, inject } from '@angular/core';
import { Tour, RouteInfo, RouteMetrics } from '../models/tour';
import { TourViewModel } from './tour.vm';

@Injectable()
export class TourCreateViewModel {
  tourVm = inject(TourViewModel);

  isEditing = signal<boolean>(false);

  name = signal<string>('');
  description = signal<string>('');

  from = signal<string>('');
  to = signal<string>('');
  transportType = signal<string>('');
  routeInformation = signal<string>('');

  distanceKm = signal<number>(0);
  estimatedTimeMinutes = signal<number>(0);

  route = computed<RouteInfo>(() => ({
    from: this.from(),
    to: this.to(),
    transportType: this.transportType(),
    routeInformation: this.routeInformation()
  }));

  metrics = computed<RouteMetrics>(() => ({
    distanceKm: this.distanceKm(),
    estimatedTimeMinutes: this.estimatedTimeMinutes()
  }));

  tour = computed<Tour>(() => 
    new Tour(this.tourVm.tours().length + 1, this.name(), this.description(), this.route(), this.metrics())
  );

  addTour() {
    if (this.isEditing()) {
      const id = this.tourVm.selectedTourId();

      this.tourVm.tours.update(tours =>
        tours.map(tour =>
          tour.id === id ? this.tour() : tour
        )
      );
      this.isEditing.set(false);
      return;
    }
    this.tourVm.tours.update((tours) => [...tours, this.tour()]);
  }

  startEdit(tour: Tour | null) {
    this.tourVm.showForm.set(true);
    this.isEditing.set(true);
    let selectedTour = this.tourVm.selectedTour();

    if (selectedTour !== null) {
      this.name.set(selectedTour.name);
      this.description.set(selectedTour.description);
      this.from.set(selectedTour.route.from);
      this.to.set(selectedTour.route.to);
      this.transportType.set(selectedTour.route.transportType);
      this.routeInformation.set(selectedTour.route.routeInformation);
      this.distanceKm.set(selectedTour.metrics.distanceKm);
      this.estimatedTimeMinutes.set(selectedTour.metrics.estimatedTimeMinutes);
    }
  }
}
