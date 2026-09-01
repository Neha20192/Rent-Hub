import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertyService } from '../../services/property';
import { Auth } from '../../services/auth/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editpost',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editpost.html',
  styleUrl: './editpost.scss',
})
export class Editpost {
  private fb = inject(FormBuilder);
  private propertyService = inject(PropertyService);
  private authService = inject(Auth);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  editForm!: FormGroup;
  propertyId!: number;

  ngOnInit(): void {
    // 1. Guard against non-admin access
    if (!this.authService.isAdmin()) {
      alert('Unauthorized: Only administrators can edit properties.');
      this.router.navigate(['/']);
      return;
    }

    // 2. Build form controls matching your property data structure
    this.editForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      location: ['', Validators.required],
      rent: [null, [Validators.required, Validators.min(1)]],
      bedrooms: [1, [Validators.required, Validators.min(1)]],
      bathrooms: [1, [Validators.required, Validators.min(1)]],
      propertyType: ['Apartment', Validators.required],
      imageUrl: ['', Validators.required], // Standard string path input
      available: [true, Validators.required],
    });

    // 3. Extract target property ID from URL parameter
    this.propertyId = Number(this.route.snapshot.paramMap.get('id'));
    const existingProperty = this.propertyService
      .getProperties()
      .find((p) => p.id === this.propertyId);

    // 4. Pre-fill (patch) existing post values into the form
    if (existingProperty) {
      this.editForm.patchValue(existingProperty);
    } else {
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    // 5. Combine form values with existing property ID
    const updatedPropertyData = {
      ...this.editForm.value,
      id: this.propertyId,
    };

    // 6. Update state and redirect
    this.propertyService.updateProperty(updatedPropertyData);
    this.router.navigate(['/properties', this.propertyId]);
  }
}
