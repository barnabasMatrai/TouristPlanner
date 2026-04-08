import { Injectable, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TourLog } from '../models/tour';
import { TourLogCreateViewModel } from './tour-log-create.vm';
import { TourLogListViewModel } from './tour-log-list.vm';

@Injectable()
export class TourLogViewModel {
  formVm = inject(TourLogCreateViewModel);
  listVm = inject(TourLogListViewModel);

  showForm = this.formVm.showForm;

  toggleForm(form?: NgForm) {
    this.formVm.toggle(form);
  }

  startCreate() {
    this.formVm.toggle();
  }

  startEdit(log: TourLog) {
    this.formVm.startEdit(log);
  }

  cancel(form?: NgForm) {
    this.formVm.cancel(form);
  }
}