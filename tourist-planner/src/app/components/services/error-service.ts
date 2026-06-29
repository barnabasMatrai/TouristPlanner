import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  message = signal<string | null>(null);

  show(msg: string) {
    this.message.set(msg);
  }

  clear() {
    this.message.set(null);
  }
}
