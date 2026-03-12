export class Tour {
  id: number = 0;
  name: string;
  description: string;
  route: RouteInfo;
  metrics: RouteMetrics;

  constructor(name: string, description: string, route: RouteInfo, metrics: RouteMetrics) {
    this.name = name;
    this.description = description;
    this.route = route;
    this.metrics = metrics;
  }
}

export interface RouteInfo {
  from: string;
  to: string;
  transportType: string;
  routeInformation: string;
}

export interface RouteMetrics {
  distanceKm: number;
  estimatedTimeMinutes: number;
}