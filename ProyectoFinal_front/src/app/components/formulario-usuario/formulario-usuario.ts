import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

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
      confirmarContraseña: ['', this.isEditMode ? [] : Validators.required],
      tipo: ['', Validators.required],
      estado: [true],
      subscripcion: ['']
    }, {
      validators: this.passwordsMatch()
    });

    this.route.paramMap.subscribe(params => {
      this.idUsuario = params.get('id');
      this.isEditMode = !!this.idUsuario;

      if (this.isEditMode) {
        this.usuarioForm.get('confirmarContraseña')?.clearValidators();
        this.usuarioForm.get('confirmarContraseña')?.updateValueAndValidity();

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
        Swal.fire({
          icon: 'success',
          title: 'Usuario actualizado',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/agregar-usuarios']);
      }, () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el usuario.'
        });
      });
    } else {
      this.http.post('http://localhost:3000/api/usuarios', datos).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Usuario agregado',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/agregar-usuarios']);
      }, () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo agregar el usuario.'
        });
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

  passwordsMatch() {
    return (form: FormGroup) => {
      const pass = form.get('contraseña')?.value;
      const confirm = form.get('confirmarContraseña')?.value;
      return pass === confirm ? null : { passwordMismatch: true };
    };
  }
}
