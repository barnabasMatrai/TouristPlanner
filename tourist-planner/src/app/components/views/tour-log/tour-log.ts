import { Component, computed, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TourLog } from '../../models/tour';
import { TourViewModel } from '../../viewmodels/tour.vm';

@Component({
  selector: 'app-tour-log',
  imports: [FormsModule],
  templateUrl: './tour-log.html',
  styleUrl: './tour-log.css'
})
export class TourLogView {
  tourVm = inject(TourViewModel);
  tourId = input.required<number>();

  showForm = false;
  editingLogId: number | null = null;

  date = '';
  comment = '';
  difficulty = 1;
  distance = 0;
  time = 0;
  rating = 1;

  logs = computed(() => this.tourVm.getLogsForTour(this.tourId()));

  onSubmit(form: any) {
    if (form.invalid) return;

    if (this.editingLogId !== null) {
      this.tourVm.updateLogForTour({
        id: this.editingLogId,
        date: this.date,
        comment: this.comment,
        difficulty: this.difficulty,
        distance: this.distance,
        time: this.time,
        rating: this.rating,
        tourId: this.tourId()
      });
    } else {
      this.tourVm.addLogForTour({
        date: this.date,
        comment: this.comment,
        difficulty: this.difficulty,
        distance: this.distance,
        time: this.time,
        rating: this.rating,
        tourId: this.tourId()
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
    this.tourVm.deleteLogForTour(this.tourId(), logId);
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
