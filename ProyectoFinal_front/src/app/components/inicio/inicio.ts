import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../services/user';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule, RouterModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio {
  constructor(private user: User) {}

  get isLoggedIn(): boolean {
    return this.user.isLoggedIn();
  }
}
