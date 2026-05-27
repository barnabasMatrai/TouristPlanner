export interface TourCreate {
  name: string;
  description: string;
  route: RouteInfoCreate;
  metrics: RouteMetricsCreate;
}

export interface RouteInfoCreate {
  from: string;
  to: string;
  transportType: string;
  routeInformation: string;
}

export interface RouteMetricsCreate {
  distanceKm: number;
  estimatedTimeMinutes: number;
}
