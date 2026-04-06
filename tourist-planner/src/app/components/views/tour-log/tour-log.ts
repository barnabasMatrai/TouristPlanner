import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TourLogViewModel } from '../../viewmodels/tour-log.vm';

@Component({
  selector: 'app-tour-log',
  imports: [FormsModule],
  templateUrl: './tour-log.html',
  styleUrl: './tour-log.css',
  providers: [TourLogViewModel]
})
export class TourLogView {
  tourLogVm = inject(TourLogViewModel);

  @Input() set tourId(value: number) {
    this.tourLogVm.setTourId(value);
  }
}
