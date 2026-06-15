import { Component, inject, OnInit, effect } from '@angular/core';
import * as L from 'leaflet';
import { MapViewModel } from '../../viewmodels/map.vm';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class MapView implements OnInit {
  mapVm = inject(MapViewModel);

  map!: L.Map;
  routeLayer?: L.GeoJSON;

  constructor() {
    effect(() => {
      const geojson = this.mapVm.geojson();

      if (!this.map) {
        return;
      }

      if (this.routeLayer) {
        this.map.removeLayer(this.routeLayer);
        this.routeLayer = undefined;
      }

      if (!geojson) {
        return;
      }

      this.routeLayer = L.geoJSON(geojson).addTo(this.map);
      this.map.fitBounds(this.routeLayer.getBounds());
    });
  }

  ngOnInit() {
    this.map = L.map('map').setView([48.2082, 16.3738], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);
  }
}
