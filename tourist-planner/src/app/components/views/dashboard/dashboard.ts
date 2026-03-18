import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TourListViewModel } from '../../viewmodels/tour-list.vm';
import { TourViewModel } from '../../viewmodels/tour.vm';
import { TourListView } from '../tour-list/tour-list';
import { TourInfoView } from "../tour-info/tour-info";
import { TourInfoViewModel } from '../../viewmodels/tour-info.vm';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, TourListView, TourInfoView],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  providers: [TourViewModel, TourListViewModel, TourInfoViewModel]
})
export class Dashboard {

  constructor(private router: Router) {}

  onLogout() {
    this.router.navigate(['/home']);
  }

  tourVm = inject(TourViewModel);
  tourListVm = inject(TourListViewModel);

}