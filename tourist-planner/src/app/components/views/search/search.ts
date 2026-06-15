import { Component, inject } from '@angular/core';
import { SearchViewModel } from '../../viewmodels/search.vm';
import { FormsModule } from '@angular/forms';
import { TourViewModel } from '../../viewmodels/tour.vm';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class SearchView {
  tourVm = inject(TourViewModel);
  searchVm = inject(SearchViewModel);

  onSearch(value: string) {
    this.searchVm.setQuery(value);
  }
}
