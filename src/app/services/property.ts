import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Property } from '../Model/property.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private initialProperties: Property[] = [
    {
      id: 1,
      title: 'Modern 2 BHK Apartment',
      description: 'A spacious and modern apartment in a peaceful location.',
      location: 'Kanpur',
      rent: 15000,
      bedrooms: 2,
      bathrooms: 2,
      propertyType: 'Apartment',
      imageUrl: 'assets/images/img1.jpg',
      available: true
    }
  ];

  // Initialize state from localStorage or initial array
  private propertiesSubject = new BehaviorSubject<Property[]>(this.loadFromStorage());
  // properties$: Observable<Property[]> = this.propertiesSubject.asObservable();

  private loadFromStorage(): Property[] {
    const saved = localStorage.getItem('renthub_properties');
    return saved ? JSON.parse(saved) : this.initialProperties;
  }

  getProperties(): Property[] {
    return this.propertiesSubject.getValue();
  }

  addProperty(newProperty: Omit<Property, 'id' | 'available'>): void {
    const currentProperties = this.getProperties();
    const createdProperty: Property = {
      ...newProperty,
      id: Date.now(),
      available: true,
      imageUrl: newProperty.imageUrl || 'assets/images/placeholder.jpg'
    };

    const updatedList = [createdProperty, ...currentProperties];
    
    this.propertiesSubject.next(updatedList);
    localStorage.setItem('renthub_properties', JSON.stringify(updatedList));
  }

  updateProperty(updatedProperty: Property): void {
    const properties = this.getProperties();
    const index = properties.findIndex((p) => p.id === updatedProperty.id);

    if (index !== -1) {
      properties[index] = updatedProperty; // Replace old data with edited data
      this.propertiesSubject.next(properties); // Update RxJS Subject listeners
      localStorage.setItem('renthub_properties', JSON.stringify(properties)); // Persist to storage
    }
  }

  // DELETE PROPERTY METHOD
  deleteProperty(id: number): void {
    const filtered = this.getProperties().filter((p) => p.id !== id);
    this.propertiesSubject.next(filtered);
    localStorage.setItem('renthub_properties', JSON.stringify(filtered));
  }
}