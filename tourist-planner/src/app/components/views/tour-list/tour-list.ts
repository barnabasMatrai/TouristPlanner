import { Component, inject } from '@angular/core';
import { TourListViewModel } from '../../viewmodels/tour-list.vm';
import { TourViewModel } from '../../viewmodels/tour.vm';

@Component({
  selector: 'app-tour-list',
  imports: [],
  templateUrl: './tour-list.html',
  providers: [TourViewModel, TourListViewModel],
  styleUrl: '../dashboard/dashboard.css'
})
export class TourListView {
  tourVm = inject(TourViewModel);
  tourListVm = inject(TourListViewModel);
}