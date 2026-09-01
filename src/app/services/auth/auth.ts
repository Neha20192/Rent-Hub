import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../Model/user.model';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly authKey = 'renthub_is_logged_in';
  private readonly usersKey = 'renthub_registered_users';
  private readonly currentUserKey = 'renthub_current_user';

  private authState = new BehaviorSubject<boolean>(
    localStorage.getItem(this.authKey) === 'true'
  );
  isLoggedIn$ = this.authState.asObservable();

  private currentUserSubject = new BehaviorSubject<User | null>(
    JSON.parse(localStorage.getItem(this.currentUserKey) || 'null')
  );
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.seedDefaultUsers();
  }

  // Pre-seed an admin and standard user if storage is empty
  private seedDefaultUsers(): void {
    if (!localStorage.getItem(this.usersKey)) {
      const defaultUsers: User[] = [
        { name: 'Admin', email: 'test@renthub.com', password: '123456', role: 'admin' },
        { name: 'John Doe', email: 'user@renthub.com', password: '123456', role: 'user' },
      ];
      localStorage.setItem(this.usersKey, JSON.stringify(defaultUsers));
    }
  }

  getUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.usersKey) || '[]');
  }

  register(newUser: User): { success: boolean; message?: string } {
    const users = this.getUsers();
    
    // Check for duplicate email
    if (users.some((u) => u.email.toLowerCase() === newUser.email.toLowerCase())) {
      return { success: false, message: 'Email already registered.' };
    }

    users.push(newUser);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    return { success: true };
  }

  login(email: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      localStorage.setItem(this.authKey, 'true');
      localStorage.setItem(this.currentUserKey, JSON.stringify(userWithoutPassword));
      
      this.authState.next(true);
      this.currentUserSubject.next(userWithoutPassword as User);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.authKey);
    localStorage.removeItem(this.currentUserKey);
    this.authState.next(false);
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.authState.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'admin';
  }
}