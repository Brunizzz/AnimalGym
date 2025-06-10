// src/app/services/user.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private key = 'registeredUsers';
  private users: any[] = [];

  constructor() {
    const saved = localStorage.getItem(this.key);
    this.users = saved ? JSON.parse(saved) : [];
  }

  register(user: any): void {
    this.users.push(user);
    localStorage.setItem(this.key, JSON.stringify(this.users));
  }

  getUsers(): any[] {
    return this.users;
  }
}
