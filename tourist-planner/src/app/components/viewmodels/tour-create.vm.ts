import { computed, Injectable, signal, inject } from '@angular/core';
import { Tour, RouteInfo, RouteMetrics } from '../models/tour';
import { TourViewModel } from './tour.vm';
import { TourService } from '../services/tour-service';
import { handleRequest } from '../../helpers/request.helper';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TourCreateViewModel {
  tourVm = inject(TourViewModel);
  tourService = inject(TourService);
  authService = inject(AuthService);

  isEditing = signal<boolean>(false);

  name = signal<string>('');
  description = signal<string>('');

  from = signal<string>('');
  to = signal<string>('');
  routeGeometry = signal<string>('');
  transportType = signal<string>('');
  routeInformation = signal<string>('');

  distanceKm = signal<number>(0);
  estimatedTimeMinutes = signal<number>(0);

  route = computed<RouteInfo>(() => ({
    from: this.from(),
    to: this.to(),
    routeGeometry: this.routeGeometry(),
    transportType: this.transportType(),
    routeInformation: this.routeInformation()
  }));

  metrics = computed<RouteMetrics>(() => ({
    distanceKm: this.distanceKm(),
    estimatedTimeMinutes: this.estimatedTimeMinutes()
  }));

  tour = computed<Tour>(() => {
    const userId = this.authService.userId();

    if (userId === null) {
      throw new Error('User must be logged in to create a tour');
    }

    return new Tour(
      this.tourVm.tours().length + 1,
      userId,
      this.name(),
      this.description(),
      this.route(),
      this.metrics()
    );
  });

  addTour() {
    this.tourVm.createTour(this.tour());
  }

  updateTour() {
    this.tourVm.updateTour(this.tour());
    this.isEditing.set(false);
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
