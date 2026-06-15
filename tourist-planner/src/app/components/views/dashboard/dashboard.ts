import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TourViewModel } from '../../viewmodels/tour.vm';
import { TourListView } from '../tour-list/tour-list';
import { TourInfoView } from "../tour-info/tour-info";
import { TourCreateView } from '../tour-create/tour-create';
import { TourListViewModel } from '../../viewmodels/tour-list.vm';
import { TourInfoViewModel } from '../../viewmodels/tour-info.vm';
import { TourCreateViewModel } from '../../viewmodels/tour-create.vm';
import { TourService } from '../../services/tour-service';
import { AuthService } from '../../services/auth.service';
import { MapView } from '../map/map';
import { MapViewModel } from '../../viewmodels/map.vm';
import { SearchView } from "../search/search";
import { SearchViewModel } from '../../viewmodels/search.vm';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, TourListView, TourInfoView, TourCreateView, SearchView],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  providers: [
    TourViewModel,
    TourListViewModel,
    TourInfoViewModel,
    TourCreateViewModel,
    SearchViewModel,
    TourService,
    MapViewModel
  ]
})
export class Dashboard {

  private router = inject(Router);
  authService = inject(AuthService);

  tourVm = inject(TourViewModel);

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}