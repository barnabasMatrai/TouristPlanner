import { Component, inject, effect } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TourViewModel } from '../../viewmodels/tour.vm';
import { TourListView } from '../tour-list/tour-list';
import { TourInfoView } from "../tour-info/tour-info";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, TourListView, TourInfoView],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  providers: [TourViewModel]
})
export class Dashboard {

  constructor(private router: Router) {}

  onLogout() {
    this.router.navigate(['/home']);
  }

  tourVm = inject(TourViewModel);

}