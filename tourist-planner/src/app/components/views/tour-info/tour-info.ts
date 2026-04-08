import { Component, inject, input } from '@angular/core';
import { TourInfoViewModel } from '../../viewmodels/tour-info.vm';
import { TourListViewModel } from '../../viewmodels/tour-list.vm';
import { TourCreateViewModel } from '../../viewmodels/tour-create.vm';
import { Tour } from '../../models/tour';
import { TourLogView } from '../tour-log/tour-log';

@Component({
  selector: 'app-tour-info',
  imports: [TourLogView],
  templateUrl: './tour-info.html',
  providers: [],
  styleUrl: '../dashboard/dashboard.css'
})
export class TourInfoView {
  tourInfoVm = inject(TourInfoViewModel);
  tourListVm = inject(TourListViewModel);
  tourCreateVm = inject(TourCreateViewModel);
  tourVm = this.tourInfoVm.tourVm;

  tourSignal = input.required<Tour>();

  edit() {
    this.tourCreateVm.startEdit(this.tourVm.selectedTour());
  }

  delete() {
    this.tourListVm.deleteTour(this.tourVm.selectedTourId());
  }
}