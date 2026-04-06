import { Component, inject } from '@angular/core';
import { TourCreateViewModel } from '../../viewmodels/tour-create.vm';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tour-create',
  imports: [FormsModule],
  templateUrl: './tour-create.html',
  providers: [TourCreateViewModel],
  styleUrl: './tour-create.css'
})
export class TourCreateView {
  tourCreateVm = inject(TourCreateViewModel);
  tourVm = this.tourCreateVm.tourVm;

  onSubmit(form: any) {
    if (form.invalid) return;

    this.tourCreateVm.addTour();
  }
}