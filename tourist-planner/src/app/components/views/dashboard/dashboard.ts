import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LeafletMapComponent } from '../leaflet-map/leaflet-map';


@Component({
  selector: 'app-dashboard',
 standalone: true,
  imports: [RouterModule, LeafletMapComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

}
