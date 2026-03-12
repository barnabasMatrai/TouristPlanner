import { Component, inject } from '@angular/core';
import { TourList } from '../tour-list/tour-list';
import { TourInfo } from '../tour-info/tour-info';
import { TourInfoViewModel } from '../../viewmodels/tour-info.vm';
import { TourListViewModel } from '../../viewmodels/tour-list.vm';
import { TourViewModel } from '../../viewmodels/tour.vm';

@Component({
  selector: 'app-tour-main',
  imports: [TourList, TourInfo],
  templateUrl: './tour-main.html',
  styleUrl: './tour-main.css',
  providers: [TourInfoViewModel, TourListViewModel, TourViewModel],
})
export class TourMain {
  vm = inject(TourViewModel);
}