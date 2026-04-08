import { Component, inject } from '@angular/core';
import { TourCreateViewModel } from '../../viewmodels/tour-create.vm';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tour-create',
  imports: [FormsModule],
  templateUrl: './tour-create.html',
  providers: [],
  styleUrl: './tour-create.css'
})
export class TourCreateView {
  tourCreateVm = inject(TourCreateViewModel);
  tourVm = this.tourCreateVm.tourVm;

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.tourCreateVm.addTour();
  }
}