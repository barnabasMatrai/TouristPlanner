import { computed, Injectable, signal, inject } from '@angular/core';
import { Tour, RouteInfo, RouteMetrics } from '../models/tour';
import { TourViewModel } from './tour.vm';

@Injectable()
export class TourCreateViewModel {
  tourVm = inject(TourViewModel);

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
  Tour.createNew(
    this.name(),
    this.description(),
    this.route(),
    this.metrics()
  )
);
}
