import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Editpost } from './editpost';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { vi, describe, beforeEach, it, expect } from 'vitest';
import { PropertyService } from '../../services/property';
import { Auth } from '../../services/auth/auth';

describe('Editpost', () => {
  let component: Editpost;
  let fixture: ComponentFixture<Editpost>;
  let mockPropertyService: any;
  let mockAuthService: any;

  beforeEach(async () => {
    // 1. Mock PropertyService with mock data return
    mockPropertyService = {
      getProperties: vi.fn().mockReturnValue([
        {
          id: 1,
          title: 'Test Property',
          description: 'A complete description for testing',
          location: 'Kanpur',
          rent: 10000,
          bedrooms: 2,
          bathrooms: 2,
          propertyType: 'Apartment',
          imageUrl: 'assets/images/img1.jpg',
          available: true
        }
      ]),
      updateProperty: vi.fn()
    };

    // 2. Mock Auth service so isAdmin() returns true
    mockAuthService = {
      isAdmin: vi.fn().mockReturnValue(true)
    };

    await TestBed.configureTestingModule({
      imports: [Editpost, ReactiveFormsModule],
      providers: [
        provideRouter([]),
        { provide: PropertyService, useValue: mockPropertyService },
        { provide: Auth, useValue: mockAuthService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1' // Mocks route parameter ID = 1
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Editpost);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Now safe to run ngOnInit()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with existing property data', () => {
    expect(component.editForm).toBeDefined();
    expect(component.editForm.get('title')?.value).toBe('Test Property');
  });
});