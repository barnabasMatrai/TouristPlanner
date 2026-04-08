import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TourLogCreateViewModel } from '../../viewmodels/tour-log-create.vm';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tour-log-create',
  imports: [FormsModule],
  templateUrl: './tour-log-create.html',
  providers: [],
  styleUrl: '../tour-log//tour-log.css'
})
export class TourLogCreateComponent {
  vm = inject(TourLogCreateViewModel);

  @Input({ required: true }) tourId!: number;

  onSubmit(form: NgForm) {
    this.vm.submit(this.tourId, form);
  }

  cancel(form: NgForm) {
    this.vm.cancel(form);
  }
}