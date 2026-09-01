import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Createpost } from './createpost';
import { Router, provideRouter } from '@angular/router'; // Added provideRouter
import { ReactiveFormsModule } from '@angular/forms';
import { PropertyService } from '../../services/property';

describe('Createpost Component', () => {
 let component: Createpost;
  let fixture: ComponentFixture<Createpost>;
  let mockPropertyService: { addProperty: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    // Vitest equivalent of createSpyObj
    mockPropertyService = {
      addProperty: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [Createpost, ReactiveFormsModule],
      providers: [
        provideRouter([]),
        { provide: PropertyService, useValue: mockPropertyService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Createpost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should call addProperty on valid form submission', () => {
    component.postForm.setValue({
      title: 'Valid Property Title',
      description: 'A complete description of the property listing.',
      location: 'Kanpur',
      rent: 15000,
      bedrooms: 2,
      bathrooms: 2,
      propertyType: 'Apartment',
      imageUrl: 'assets/images/img1.jpg',
      available: true,
    });

    component.onSubmit();

    // Vitest assertions
    expect(mockPropertyService.addProperty).toHaveBeenCalled();
    expect(mockPropertyService.addProperty).toHaveBeenCalledTimes(1);
  });
});