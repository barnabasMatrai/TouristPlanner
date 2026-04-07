import { Injectable, inject } from '@angular/core';
import { TourLogCreateViewModel } from './tour-log-create.vm';
import { TourLogListViewModel } from './tour-log-list.vm';

@Injectable()
export class TourLogViewModel {
  formVm = inject(TourLogCreateViewModel);
  listVm = inject(TourLogListViewModel);

  showForm = this.formVm.showForm;

  toggleForm(form?: any) {
    this.formVm.toggle(form);
  }

  startCreate() {
    this.formVm.toggle();
  }

  startEdit(log: any) {
    this.formVm.startEdit(log);
  }

  cancel(form?: any) {
    this.formVm.cancel(form);
  }
}