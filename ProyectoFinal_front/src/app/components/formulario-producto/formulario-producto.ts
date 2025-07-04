import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './formulario-producto.html',
  styleUrl: './formulario-producto.css'
})
export class FormularioProducto implements OnInit {
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  router = inject(Router);
  http = inject(HttpClient);

  isEditMode = signal(false);
  idProducto = signal<string | null>(null);

  productoForm!: FormGroup;

  ngOnInit() {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), this.prohibidoValidator(['gratis', 'fake', 'demo'])]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      precio: [null, [Validators.required, Validators.min(0.01)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      activo: [true]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.idProducto.set(id);
      this.isEditMode.set(!!id);

      if (this.isEditMode()) {
        this.http.get<any>(`http://localhost:3000/api/productos/${id}`).subscribe(prod => {
          if (prod) this.productoForm.patchValue(prod);
        });
      }
    });
  }

  prohibidoValidator(palabras: string[]) {
    return (control: AbstractControl): ValidationErrors | null => {
      const valor = control.value?.toLowerCase();
      if (palabras.some(p => valor?.includes(p))) {
        return { palabraProhibida: true };
      }
      return null;
    };
  }

  guardar() {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    const producto = this.productoForm.value;

    if (this.isEditMode()) {
      this.http.put(`http://localhost:3000/api/productos/${this.idProducto()}`, producto).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Producto actualizado',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/agregar-productos']);
      }, () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el producto.'
        });
      });
    } else {
      this.http.post(`http://localhost:3000/api/productos`, producto).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Producto agregado',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/agregar-productos']);
      }, () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo agregar el producto.'
        });
      });
    }
  }

  cancelar() {
    this.router.navigate(['/agregar-productos']);
  }

  campoInvalido(campo: string): boolean {
    const control = this.productoForm.get(campo);
    return !!(control && control.invalid && control.touched);
  }
}
