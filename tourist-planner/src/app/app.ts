import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterModule } from '@angular/router';
import { TourMain } from './components/views/tour-main/tour-main';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, RouterLinkWithHref, TourMain],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tourist-planner');
}
