import { Component, inject, input } from '@angular/core';
import { TourLogViewModel } from '../../viewmodels/tour-log.vm';
import { TourLogCreateComponent } from '../tour-log-create/tour-log-create';
import { TourLogListComponent } from '../tour-log-list/tour-log-list';
import { TourLogCreateViewModel } from '../../viewmodels/tour-log-create.vm';
import { TourLogListViewModel } from '../../viewmodels/tour-log-list.vm';

@Component({
  selector: 'app-tour-log',
  imports: [TourLogCreateComponent, TourLogListComponent],
  templateUrl: './tour-log.html',
  providers: [TourLogViewModel, TourLogCreateViewModel, TourLogListViewModel],
  styleUrl: './tour-log.css'
})
export class TourLogView {
  vm = inject(TourLogViewModel);
  tourId = input.required<number>();

  toggleForm() {
    this.vm.toggleForm();
  }
}