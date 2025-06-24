import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Login } from './components/login/login';
import { Instalaciones } from './components/instalaciones/instalaciones';
import { Nosotros } from './components/nosotros/nosotros';
import { Productos } from './components/productos/productos';
import { Contacto } from './components/contacto/contacto';
import { AgregarProductosComponent } from './components/agregar-productos/agregar-productos.component';
import { AgregarUsuariosComponent } from './components/agregar-usuarios/agregar-usuarios.component';
import { FormularioUsuario } from './components/formulario-usuario/formulario-usuario';
import { CompraProductos } from './components/compra-productos/compra-productos';
import { ResumenCompra } from './components/resumen-compra/resumen-compra';
import { Subscripcion } from './components/subscripcion/subscripcion';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Inicio },
  { path: 'login', component: Login },
  { path: 'instalaciones', component: Instalaciones },
  { path: 'nosotros', component: Nosotros },
  { path: 'productos', component: Productos },
  { path: 'contacto', component: Contacto },
  { path: 'agregar-productos', component: AgregarProductosComponent },
  { path: 'agregar-usuarios', component: AgregarUsuariosComponent },
  { path: 'compra-productos', component: CompraProductos },
  { path: 'resumen-compra', component: ResumenCompra },
  { path: 'subscripcion', component: Subscripcion },

  {
    path: 'nuevo-usuario',
    component: FormularioUsuario
  },
  {
    path: 'editar-usuario/:id',
    component: FormularioUsuario
  },

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
