import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Login } from './components/login/login';
import { Instalaciones } from './components/instalaciones/instalaciones';
import { Nosotros } from './components/nosotros/nosotros';
import { Productos } from './components/productos/productos';
import { Contacto } from './components/contacto/contacto';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Inicio },
  { path: 'login', component: Login },
  { path: 'instalaciones', component: Instalaciones },
  { path: 'nosotros', component: Nosotros },
  { path: 'productos', component: Productos },
  { path: 'contacto', component: Contacto },

  // 👇 Nueva ruta al componente BloqueoUsuariosComponent
  {
    path: 'bloqueo-usuarios',
    loadComponent: () =>
      import('./components/bloqueo-usuarios/bloqueo-usuarios').then(
        m => m.BloqueoUsuariosComponent
      )
  }
];
