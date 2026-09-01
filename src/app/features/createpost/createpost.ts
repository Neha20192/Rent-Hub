import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertyService } from '../../services/property';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createpost',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './createpost.html',
  styleUrl: './createpost.scss',
})
export class Createpost {
  postForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private propertyService: PropertyService,
    private router: Router){}

    ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      location: ['', Validators.required],
      rent: [null, [Validators.required, Validators.min(1)]],
      bedrooms: [1, [Validators.required, Validators.min(1)]],
      bathrooms: [1, [Validators.required, Validators.min(1)]],
      propertyType: ['Apartment', Validators.required],
      imageUrl: ['assets/images/img1.jpg', Validators.required],
      available: [true, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }

    this.propertyService.addProperty(this.postForm.value);
    this.router.navigate(['/']);
  }
}
