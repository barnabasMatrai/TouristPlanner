import { Component, inject } from '@angular/core';
import { TourInfoViewModel } from '../../viewmodels/tour-info.vm';

@Component({
  selector: 'app-tour-info',
  imports: [],
  templateUrl: './tour-info.html',
  styleUrl: './tour-info.css',
})
export class TourInfo {
  vm = inject(TourInfoViewModel);
}
