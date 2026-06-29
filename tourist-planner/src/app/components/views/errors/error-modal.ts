import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-error-modal',
  standalone: true,
  templateUrl: './error-modal.html',
  styleUrl: './error-modal.css'
})
export class ErrorModal {
  message = input<string | null>();
  closeModal = output<void>();
}
