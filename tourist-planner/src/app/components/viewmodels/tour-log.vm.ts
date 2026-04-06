import { computed, inject, Injectable, signal } from '@angular/core';
import { TourLog } from '../models/tour';
import { TourViewModel } from './tour.vm';

@Injectable()
export class TourLogViewModel {
  tourVm = inject(TourViewModel);

  tourId = signal<number | null>(null);
  showForm = false;
  editingLogId: number | null = null;

  date = '';
  comment = '';
  difficulty = 1;
  distance = 0;
  time = 0;
  rating = 1;

  logs = computed(() => {
    const id = this.tourId();
    if (id === null) return [];
    return this.tourVm.getLogsForTour(id);
  });

  setTourId(tourId: number) {
    this.tourId.set(tourId);
  }

  onSubmit(form: any) {
    if (form.invalid) return;

    const currentTourId = this.tourId();
    if (currentTourId === null) return;

    if (this.editingLogId !== null) {
      this.tourVm.updateLogForTour({
        id: this.editingLogId,
        date: this.date,
        comment: this.comment,
        difficulty: this.difficulty,
        distance: this.distance,
        time: this.time,
        rating: this.rating,
        tourId: currentTourId
      });
    } else {
      this.tourVm.addLogForTour({
        date: this.date,
        comment: this.comment,
        difficulty: this.difficulty,
        distance: this.distance,
        time: this.time,
        rating: this.rating,
        tourId: currentTourId
      });
    }

    this.closeForm(form);
  }

  toggleForm(form?: any) {
    if (this.showForm) {
      this.closeForm(form);
      return;
    }

    this.showForm = true;
  }

  startEdit(log: TourLog) {
    this.showForm = true;
    this.editingLogId = log.id;
    this.date = log.date;
    this.comment = log.comment;
    this.difficulty = log.difficulty;
    this.distance = log.distance;
    this.time = log.time;
    this.rating = log.rating;
  }

  deleteLog(logId: number) {
    const currentTourId = this.tourId();
    if (currentTourId === null) return;
    this.tourVm.deleteLogForTour(currentTourId, logId);
  }

  cancelEdit(form?: any) {
    this.closeForm(form);
  }

  private closeForm(form?: any) {
    this.showForm = false;
    this.editingLogId = null;
    this.resetForm();
    if (form) {
      form.resetForm({
        date: '',
        comment: '',
        difficulty: 1,
        distance: 0,
        time: 0,
        rating: 1
      });
    }
  }

  private resetForm() {
    this.date = '';
    this.comment = '';
    this.difficulty = 1;
    this.distance = 0;
    this.time = 0;
    this.rating = 1;
  }
}
