import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TourLogCreateViewModel } from '../../viewmodels/tour-log-create.vm';

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

  onSubmit(form: any) {
    this.vm.submit(this.tourId, form);
  }

  cancel(form: any) {
    this.vm.cancel(form);
  }
}