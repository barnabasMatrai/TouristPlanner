import { Component, inject } from '@angular/core';
import { TourInfoViewModel } from '../../viewmodels/tour-info.vm';
import { TourViewModel } from '../../viewmodels/tour.vm';

@Component({
  selector: 'app-tour-info',
  imports: [],
  templateUrl: './tour-info.html',
  providers: [TourViewModel, TourInfoViewModel],
  styleUrl: '../dashboard/dashboard.css'
})
export class TourInfoView {
  tourVm = inject(TourViewModel);
  tourInfoVm = inject(TourInfoViewModel);
}