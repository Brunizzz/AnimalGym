import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DomseguroPipe } from '../domseguro.pipe';

@Component({
  selector: 'app-pipes',
  imports: [RouterOutlet,DomseguroPipe],
  templateUrl: './pipes.component.html',
  styleUrl: './pipes.component.css'
})
export class PipesComponent {
  video:string="JUgkRbynrwY";
}
