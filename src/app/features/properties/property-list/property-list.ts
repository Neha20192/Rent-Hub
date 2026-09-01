import { Component, Input, OnInit } from '@angular/core';
import { Property } from '../../../Model/property.model';
import { PropertyService } from '../../../services/property';
import { RouterLink } from '@angular/router';
import { FavouriteService } from '../../../services/favaourite/favourite';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './property-list.html',
  styleUrl: './property-list.scss',
})
export class PropertyList implements OnInit {

  @Input() searchTerm: string = '';
  @Input() selectedType: string = '';

  properties: Property[] = [];

  constructor(private propertyservice: PropertyService, private favouriteService : FavouriteService) {}

  ngOnInit(): void {
    this.properties = this.propertyservice.getProperties();
  }

  get filteredProperties(): Property[] {
    const search = this.searchTerm.trim().toLowerCase();
    const type = this.selectedType.trim().toLowerCase();

    return this.properties.filter((property) => {
      const matchesSearch =
        !search ||
        property.location.toLowerCase().includes(search) ||
        property.title.toLowerCase().includes(search);

      const matchesType =
        !type ||
        (property.propertyType &&
          property.propertyType.toLowerCase() === type);

      return matchesSearch && matchesType;
    });
  }

  isFavourite(propertyId: number): boolean {
  return this.favouriteService.isFavourite(propertyId);
  }

  toggleFavourite(propertyId: number): void {
    this.favouriteService.toggleFavourite(propertyId);
  }
}