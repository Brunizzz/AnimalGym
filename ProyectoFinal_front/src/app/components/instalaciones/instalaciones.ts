import { Component } from '@angular/core';
import { DomseguroPipe } from '../../pipes/domseguro-pipe';

@Component({
  selector: 'app-instalaciones',
  imports: [DomseguroPipe],
  templateUrl: './instalaciones.html',
  styleUrl: './instalaciones.css'
})
export class Instalaciones {
  video:string="JUgkRbynrwY";
}
