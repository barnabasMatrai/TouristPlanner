import { Component, inject } from '@angular/core';
import { TourListViewModel } from '../../viewmodels/tour-list.vm';

@Component({
  selector: 'app-tour-list',
  imports: [],
  templateUrl: './tour-list.html',
  providers: [],
  styleUrl: '../dashboard/dashboard.css'
})
export class TourListView {
  tourListVm = inject(TourListViewModel);
  tourVm = this.tourListVm.tourVm;
}