import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Accesibilidad } from '../accesibilidad/accesibilidad';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, Accesibilidad],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer {
  mostrarAccesibilidad = false;
}
