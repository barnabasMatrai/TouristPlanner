import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as L from 'leaflet';
import { Tour } from '../../models/tour';

type Coordinates = [number, number];

@Component({
  selector: 'app-tour-route-map',
  standalone: true,
  templateUrl: './tour-route-map.html',
  styleUrl: './tour-route-map.css',
})
export class TourRouteMapView implements AfterViewInit, OnChanges, OnDestroy {
  @Input() tour: Tour | null = null;
  @ViewChild('mapContainer') mapContainer?: ElementRef<HTMLDivElement>;

  private map?: L.Map;
  private routeLayer = L.layerGroup();
  protected isLoading = false;
  protected mapError = '';

  ngAfterViewInit(): void {
    this.initializeMap();
    this.renderRoute();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tour'] && this.map) {
      this.renderRoute();
    }
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  private initializeMap(): void {
    if (!this.mapContainer) return;

    this.map = L.map(this.mapContainer.nativeElement, {
      zoomControl: true,
      attributionControl: true,
    }).setView([20, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(this.map);

    this.routeLayer.addTo(this.map);
  }

  private async renderRoute(): Promise<void> {
    if (!this.map) return;

    this.routeLayer.clearLayers();
    this.mapError = '';

    const selectedTour = this.tour;
    if (!selectedTour) {
      this.map.setView([20, 0], 2);
      return;
    }

    this.isLoading = true;
    try {
      const [fromCoords, toCoords] = await Promise.all([
        this.geocodeLocation(selectedTour.route.from),
        this.geocodeLocation(selectedTour.route.to),
      ]);

      const fromMarker = L.circleMarker(fromCoords, {
        radius: 8,
        weight: 2,
        color: '#6d28d9',
        fillColor: '#a78bfa',
        fillOpacity: 0.95,
      }).bindPopup(`From: ${selectedTour.route.from}`);

      const toMarker = L.circleMarker(toCoords, {
        radius: 8,
        weight: 2,
        color: '#1d4ed8',
        fillColor: '#60a5fa',
        fillOpacity: 0.95,
      }).bindPopup(`To: ${selectedTour.route.to}`);

      const routeLine = L.polyline([fromCoords, toCoords], {
        color: '#8b5cf6',
        weight: 4,
        opacity: 0.9,
      });

      this.routeLayer.addLayer(routeLine);
      this.routeLayer.addLayer(fromMarker);
      this.routeLayer.addLayer(toMarker);

      const routeBounds = L.latLngBounds([fromCoords, toCoords]).pad(0.35);
      this.map.fitBounds(routeBounds);
    } catch {
      this.mapError = 'Could not load route image for this tour.';
      this.map.setView([20, 0], 2);
    } finally {
      this.isLoading = false;
    }
  }

  private async geocodeLocation(location: string): Promise<Coordinates> {
    const query = encodeURIComponent(location.trim());
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Geocoding failed');
    }

    const results = (await response.json()) as Array<{ lat: string; lon: string }>;
    if (results.length === 0) {
      throw new Error('No geocoding result');
    }

    return [Number(results[0].lat), Number(results[0].lon)];
  }
}
