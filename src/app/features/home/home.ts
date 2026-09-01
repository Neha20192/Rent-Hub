import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PropertyList } from '../properties/property-list/property-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, PropertyList],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  searchTerm: string = '';
  selectedType: string = '';
}