import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private admins = [
    { username: 'admin1', password: 'pass123', nombre: 'Carlos Torres' },
    { username: 'admin2', password: 'admin456', nombre: 'María González' },
    { username: 'admin3', password: 'gymadmin', nombre: 'Laura Ramírez' }
  ];

  private adminKey = 'currentAdmin';
  private currentAdmin: any = null;

  constructor() {
    const storedAdmin = localStorage.getItem(this.adminKey);
    if (storedAdmin) {
      this.currentAdmin = JSON.parse(storedAdmin);
    }
  }

  login(username: string, password: string): boolean {
    const admin = this.admins.find(a => a.username === username && a.password === password);
    if (admin) {
      this.currentAdmin = admin;
      localStorage.setItem(this.adminKey, JSON.stringify(admin));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentAdmin = null;
    localStorage.removeItem(this.adminKey);
  }

  getAdmin(): any {
    return this.currentAdmin;
  }

  isLoggedIn(): boolean {
    return this.currentAdmin !== null;
  }
}
