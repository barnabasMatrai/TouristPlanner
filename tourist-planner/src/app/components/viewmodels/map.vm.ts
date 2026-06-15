import { Injectable, computed, inject } from "@angular/core";
import { TourViewModel } from "./tour.vm";
import { GeoJsonLineString } from "../models/geojsonlinestring";

@Injectable()
export class MapViewModel {
  tourVm = inject(TourViewModel);

  geojson = computed<GeoJsonLineString | null>(() => {
    const geometry = this.tourVm.selectedTour()?.route.routeGeometry;

    if (!geometry) {
      return null;
    }

    return JSON.parse(geometry) as GeoJsonLineString;
  });

  
}