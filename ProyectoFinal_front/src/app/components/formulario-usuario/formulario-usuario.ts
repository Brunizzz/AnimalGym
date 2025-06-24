import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './formulario-usuario.html',
  styleUrl: './formulario-usuario.css'
})
export class FormularioUsuario implements OnInit {
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  router = inject(Router);
  http = inject(HttpClient);

  usuarioForm!: FormGroup;
  isEditMode = false;
  idUsuario: string | null = null;

  ngOnInit() {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(6)]],
      tipo: ['', Validators.required],
      estado: [true],
      subscripcion: ['']
    });

    this.route.paramMap.subscribe(params => {
      this.idUsuario = params.get('id');
      this.isEditMode = !!this.idUsuario;

      if (this.isEditMode) {
        this.http.get<any[]>('http://localhost:3000/api/usuarios').subscribe(usuarios => {
          const usuario = usuarios.find(u => u.id === this.idUsuario);
          if (usuario) {
            this.usuarioForm.patchValue(usuario);
          }
        });
      }
    });
  }

  guardar() {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }

    const datos = {
      ...this.usuarioForm.value,
      fechaRegistro: this.isEditMode ? undefined : new Date()
    };

    if (this.isEditMode) {
      this.http.put(`http://localhost:3000/api/usuarios/${this.idUsuario}`, datos).subscribe(() => {
        alert('Usuario actualizado');
        this.router.navigate(['/agregar-usuarios']);
      });
    } else {
      this.http.post('http://localhost:3000/api/usuarios', datos).subscribe(() => {
        alert('Usuario agregado');
        this.router.navigate(['/agregar-usuarios']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/agregar-usuarios']);
  }

  campoInvalido(campo: string): boolean {
    const control = this.usuarioForm.get(campo);
    return !!(control && control.invalid && control.touched);
  }
}
