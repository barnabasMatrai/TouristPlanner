import { Component, computed, inject, Input } from '@angular/core';
import { TourLogViewModel } from '../../viewmodels/tour-log.vm';
import { TourLogItemComponent } from '../tour-log-item/tour-log-item';
import { TourLogListViewModel } from '../../viewmodels/tour-log-list.vm';

@Component({
  selector: 'app-tour-log-list',
  imports: [TourLogItemComponent],
  templateUrl: './tour-log-list.html',
  providers: [],
  styleUrl: '../tour-log//tour-log.css'
})
export class TourLogListComponent {
  vm = inject(TourLogListViewModel);

  @Input({ required: true }) tourId!: number;

  logs = computed(() => this.vm.logsForTour(this.tourId)());
}