import { Injectable, signal, computed, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TourLog } from '../models/tour';
import { TourViewModel } from './tour.vm';

@Injectable()
export class TourLogCreateViewModel {
  private tourVm = inject(TourViewModel);

  showForm = signal(false);
  editingLogId = signal<number | null>(null);

  date = signal('');
  comment = signal('');
  difficulty = signal(1);
  distance = signal(0);
  time = signal(0);
  rating = signal(1);

  isEditing = computed(() => this.editingLogId() !== null);

  submit(tourId: number, form: NgForm) {
    if (form.invalid) return;

    const data = {
      date: this.date(),
      comment: this.comment(),
      difficulty: this.difficulty(),
      distance: this.distance(),
      time: this.time(),
      rating: this.rating(),
      tourId
    };

    if (this.isEditing()) {
      this.tourVm.updateLogForTour({
        id: this.editingLogId()!,
        ...data
      });
    } else {
      this.tourVm.addLogForTour(data);
    }

    this.closeForm(form);
  }

  startEdit(log: TourLog) {
    this.showForm.set(true);
    this.editingLogId.set(log.id);

    this.date.set(log.date);
    this.comment.set(log.comment);
    this.difficulty.set(log.difficulty);
    this.distance.set(log.distance);
    this.time.set(log.time);
    this.rating.set(log.rating);
  }

  toggle(form?: NgForm) {
    if (this.showForm()) {
      this.closeForm(form);
    } else {
      this.showForm.set(true);
    }
  }

  cancel(form?: NgForm) {
    this.closeForm(form);
  }

  private closeForm(form?: NgForm) {
    this.showForm.set(false);
    this.editingLogId.set(null);
    this.reset();

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

  private reset() {
    this.date.set('');
    this.comment.set('');
    this.difficulty.set(1);
    this.distance.set(0);
    this.time.set(0);
    this.rating.set(1);
  }
}