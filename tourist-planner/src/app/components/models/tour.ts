export class Tour {
  id: number = 0;
  userId: number;
  name: string;
  description: string;
  route: RouteInfo;
  metrics: RouteMetrics;

  constructor(id: number, userId: number, name: string, description: string, route: RouteInfo, metrics: RouteMetrics) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.description = description;
    this.route = route;
    this.metrics = metrics;
  }

  static createNew(
    userId: number,
    name: string,
    description: string,
    route: RouteInfo,
    metrics: RouteMetrics
  ): Tour {
    return new Tour(0, userId, name, description, route, metrics);
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

export interface TourLog {
  id: number;
  date: string;
  comment: string;
  difficulty: number;
  distance: number;
  time: number;
  rating: number;
  tourId: number;
}
