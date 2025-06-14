import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Asegúrate de importar RouterModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterModule],  // Asegúrate de que RouterModule esté en la lista de imports
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {}
