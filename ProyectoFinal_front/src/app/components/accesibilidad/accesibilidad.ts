import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accesibilidad',
  imports: [CommonModule],
  templateUrl: './accesibilidad.html',
  styleUrl: './accesibilidad.css'
})
export class Accesibilidad {
  mostrarOpciones = false;

  toggleOpciones() {
    this.mostrarOpciones = !this.mostrarOpciones;
  }

  inactividadTimeout: any;

  activarProtectorPantalla(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      this.reiniciarInactividad();
      window.addEventListener('mousemove', this.reiniciarInactividad);
      window.addEventListener('keydown', this.reiniciarInactividad);
    } else {
      clearTimeout(this.inactividadTimeout);
      document.getElementById('protectorPantalla')!.style.display = 'none';
      window.removeEventListener('mousemove', this.reiniciarInactividad);
      window.removeEventListener('keydown', this.reiniciarInactividad);
    }
  }

  reiniciarInactividad = () => {
    clearTimeout(this.inactividadTimeout);
    this.inactividadTimeout = setTimeout(() => {
      document.getElementById('protectorPantalla')!.style.display = 'block';
    }, 20000);
  };

  activarContraste(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      document.body.classList.add('alto-contraste');
    } else {
      document.body.classList.remove('alto-contraste');
    }
  }

  cambiarEscala(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const valor = selectElement.value;
    document.body.style.fontSize = `${valor}em`;
  }

  cambiarFuente(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const valor = selectElement.value;
    document.body.style.fontFamily = valor;
  }
}
