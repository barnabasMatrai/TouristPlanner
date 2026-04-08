import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TourViewModel } from '../../viewmodels/tour.vm';
import { TourListView } from '../tour-list/tour-list';
import { TourInfoView } from "../tour-info/tour-info";
import { TourCreateView } from '../tour-create/tour-create';
import { TourListViewModel } from '../../viewmodels/tour-list.vm';
import { TourInfoViewModel } from '../../viewmodels/tour-info.vm';
import { TourCreateViewModel } from '../../viewmodels/tour-create.vm';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, TourListView, TourInfoView, TourCreateView],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  providers: [TourViewModel, TourListViewModel, TourInfoViewModel, TourCreateViewModel]
})
export class Dashboard {

  constructor(private router: Router) {}

  onLogout() {
    this.router.navigate(['/home']);
  }

  tourVm = inject(TourViewModel);
}