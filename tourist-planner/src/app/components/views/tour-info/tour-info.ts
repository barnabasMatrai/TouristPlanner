import { Component, inject, input, effect } from '@angular/core';
import { TourInfoViewModel } from '../../viewmodels/tour-info.vm';
import { TourListViewModel } from '../../viewmodels/tour-list.vm';
import { TourCreateViewModel } from '../../viewmodels/tour-create.vm';
import { Tour } from '../../models/tour';
import { TourLogView } from '../tour-log/tour-log';
import { MapView } from '../map/map';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tour-info',
  imports: [TourLogView, MapView],
  templateUrl: './tour-info.html',
  providers: [],
  styleUrl: '../dashboard/dashboard.css'
})
export class TourInfoView {
  tourInfoVm = inject(TourInfoViewModel);
  tourListVm = inject(TourListViewModel);
  tourCreateVm = inject(TourCreateViewModel);
  authService = inject(AuthService);
  tourVm = this.tourInfoVm.tourVm;

  tourSignal = input.required<Tour>();

  constructor() {
    effect(() => {
      const tour = this.tourVm.selectedTour();
      console.log('Selected tour userId:', tour?.userId);
    });
  }

  edit() {
    this.tourCreateVm.startEdit(this.tourVm.selectedTour());
  }

  delete() {
    this.tourVm.deleteTour(this.tourVm.selectedTourId());
  }

  export() {
    this.tourVm.exportTour(this.tourVm.selectedTourId());
  }

  import(event: Event) {
    this.tourVm.importTour(event);
  }
}