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
  imagePreview: string | null = null;

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
      imageUrl: ['', Validators.required],
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

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    console.log(event);
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64Image = reader.result as string;
        
        this.postForm.patchValue({ imageUrl: base64Image });
        this.postForm.get('imageUrl')?.markAsTouched();
        this.imagePreview = base64Image;
      };

      reader.readAsDataURL(file); 
    }
  }
}
