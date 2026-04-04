import { Component, inject, input } from '@angular/core';
import { TourInfoViewModel } from '../../viewmodels/tour-info.vm';
import { Tour } from '../../models/tour';

@Component({
  selector: 'app-tour-info',
  imports: [],
  templateUrl: './tour-info.html',
  providers: [TourInfoViewModel],
  styleUrl: '../dashboard/dashboard.css'
})
export class TourInfoView {
  tourInfoVm = inject(TourInfoViewModel);
  tourVm = this.tourInfoVm.tourVm;

  tourSignal = input.required<Tour>();
}