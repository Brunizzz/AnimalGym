import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  productoForm!: FormGroup;
  isEditMode = false;
  idProducto: string | null = null;

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
      this.idProducto = params.get('id');
      this.isEditMode = !!this.idProducto;

      if (this.isEditMode) {
        this.http.get<any>(`http://localhost:3000/api/productos/${this.idProducto}`).subscribe(prod => {
          if (prod) this.productoForm.patchValue(prod);
        });
      }
    });
  }

  // ✅ Validador personalizado: no permitir palabras prohibidas
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

    if (this.isEditMode) {
      this.http.put(`http://localhost:3000/api/productos/${this.idProducto}`, producto).subscribe(() => {
        alert('Producto actualizado');
        this.router.navigate(['/agregar-productos']);
      });
    } else {
      this.http.post(`http://localhost:3000/api/productos`, producto).subscribe(() => {
        alert('Producto agregado');
        this.router.navigate(['/agregar-productos']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/agregar-productos']);
  }

  // ✅ Métodos para facilitar validaciones en el template
  campoInvalido(campo: string): boolean {
    const control = this.productoForm.get(campo);
    return !!(control && control.invalid && control.touched);
  }
}
