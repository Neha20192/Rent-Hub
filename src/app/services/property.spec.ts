import { TestBed } from '@angular/core/testing';
import { PropertyService } from './property';
import { Property } from '../Model/property.model';

describe('Property', () => {
  let service: PropertyService;

  const mockProperty: Property = {
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
  };

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [PropertyService]
    });
    service = TestBed.inject(PropertyService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  // -------------------------------------------------------------
  // Test Case 1: Service Creation
  // -------------------------------------------------------------
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // -------------------------------------------------------------
  // Test Case 2: Load Initial Default Properties when Storage is Empty
  // -------------------------------------------------------------
  it('should load initial properties if localStorage is empty', () => {
    const properties = service.getProperties();
    expect(properties.length).toBe(1);
    expect(properties[0].title).toBe('Modern 2 BHK Apartment');
  });

  // -------------------------------------------------------------
  // Test Case 3: Load Existing Properties from LocalStorage
  // -------------------------------------------------------------
  it('should load existing properties from localStorage on initialization', () => {
    const storedProperties: Property[] = [
      { ...mockProperty, id: 999, title: 'Stored Listing' }
    ];
    localStorage.setItem('renthub_properties', JSON.stringify(storedProperties));

    // Re-instantiate service to trigger loadFromStorage()
    const customService = new PropertyService();
    
    expect(customService.getProperties().length).toBe(1);
    expect(customService.getProperties()[0].title).toBe('Stored Listing');
  });

  // -------------------------------------------------------------
  // Test Case 4: Add New Property
  // -------------------------------------------------------------
  it('should add a new property to the state and update localStorage', () => {
    const newPropertyData = {
      title: 'Luxury Villa',
      description: 'Beautiful villa with garden',
      location: 'Kanpur',
      rent: 40000,
      bedrooms: 4,
      bathrooms: 4,
      propertyType: 'Villa',
      imageUrl: 'assets/images/villa.jpg'
    };

    service.addProperty(newPropertyData);

    const properties = service.getProperties();
    expect(properties.length).toBe(2);
    expect(properties[0].title).toBe('Luxury Villa');
    expect(properties[0].available).toBe(true);
    expect(properties[0].id).toBeDefined();

    // Verify localStorage persistence
    const savedStorage = JSON.parse(localStorage.getItem('renthub_properties') || '[]');
    expect(savedStorage.length).toBe(2);
    expect(savedStorage[0].title).toBe('Luxury Villa');
  });

  // -------------------------------------------------------------
  // Test Case 5: Update Existing Property
  // -------------------------------------------------------------
  it('should update an existing property in state and localStorage', () => {
    const updatedProperty: Property = {
      ...mockProperty,
      rent: 18000,
      title: 'Updated 2 BHK Apartment'
    };

    service.updateProperty(updatedProperty);

    const properties = service.getProperties();
    expect(properties[0].rent).toBe(18000);
    expect(properties[0].title).toBe('Updated 2 BHK Apartment');

    // Verify localStorage update
    const savedStorage = JSON.parse(localStorage.getItem('renthub_properties') || '[]');
    expect(savedStorage[0].rent).toBe(18000);
  });

  // -------------------------------------------------------------
  // Test Case 6: Delete Property
  // -------------------------------------------------------------
  it('should delete a property by id and sync with localStorage', () => {
    service.deleteProperty(1);

    const properties = service.getProperties();
    expect(properties.length).toBe(0);

    // Verify localStorage reflects deletion
    const savedStorage = JSON.parse(localStorage.getItem('renthub_properties') || '[]');
    expect(savedStorage.length).toBe(0);
  });
});
