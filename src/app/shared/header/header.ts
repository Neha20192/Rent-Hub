import { Component, inject } from '@angular/core';
import { Auth } from '../../services/auth/auth';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private authService = inject(Auth);
  private router = inject(Router);

  isLoggedIn$ = this.authService.isLoggedIn$;
  
  isAdmin$ = this.authService.currentUser$.pipe(
    map(user => user?.role === 'admin')
  );

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
