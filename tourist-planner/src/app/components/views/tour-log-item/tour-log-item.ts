import { Component, inject, Input } from '@angular/core';
import { TourLog } from '../../models/tour';
import { TourLogViewModel } from '../../viewmodels/tour-log.vm';
import { TourLogListViewModel } from '../../viewmodels/tour-log-list.vm';
import { TourLogItemViewModel } from '../../viewmodels/tour-log-item.vm';
import { TourLogCreateViewModel } from '../../viewmodels/tour-log-create.vm';

@Component({
  selector: 'app-tour-log-item',
  templateUrl: './tour-log-item.html',
  providers: [],
  styleUrl: '../tour-log//tour-log.css'
})
export class TourLogItemComponent {
  tourLogItemVm = inject(TourLogViewModel);
  tourLogListVm = inject(TourLogListViewModel);

  @Input({ required: true }) log!: TourLog;
  @Input({ required: true }) tourId!: number;

  edit() {
    this.tourLogItemVm.startEdit(this.log);
  }

  delete() {
    this.tourLogListVm.deleteLog(this.tourId, this.log.id);
  }
}