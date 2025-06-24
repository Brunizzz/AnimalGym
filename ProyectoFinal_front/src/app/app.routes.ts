import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Login } from './components/login/login';
import { Instalaciones } from './components/instalaciones/instalaciones';
import { Nosotros } from './components/nosotros/nosotros';
import { Productos } from './components/productos/productos';
import { Contacto } from './components/contacto/contacto';
import { AgregarProductosComponent } from './components/agregar-productos/agregar-productos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Inicio },
  { path: 'login', component: Login },
  { path: 'instalaciones', component: Instalaciones },
  { path: 'nosotros', component: Nosotros },
  { path: 'productos', component: Productos },
  { path: 'contacto', component: Contacto },
  { path: 'agregar-productos', component: AgregarProductosComponent },

  {
    path: 'bloqueo-usuarios',
    loadComponent: () =>
      import('./components/bloqueo-usuarios/bloqueo-usuarios').then(
        m => m.BloqueoUsuarios
      )
  },

  {
    path: 'nuevo-producto',
    loadComponent: () => import('./components/formulario-producto/formulario-producto')
      .then(c => c.FormularioProducto)
  },
  {
    path: 'editar-producto/:id',
    loadComponent: () => import('./components/formulario-producto/formulario-producto')
      .then(c => c.FormularioProducto)
  }

];
