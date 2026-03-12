import { Component, inject } from '@angular/core';
import { TourListViewModel } from '../../viewmodels/tour-list.vm';

@Component({
  selector: 'app-tour-list',
  imports: [],
  templateUrl: './tour-list.html',
  providers: [TourListViewModel],
  styleUrl: './tour-list.css'
})
export class TourList {
  vm = inject(TourListViewModel);
}