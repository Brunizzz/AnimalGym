import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clase-form-template',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './clase-form-template.component.html',
  styleUrls: ['./clase-form-template.component.css'],
})
export class ClaseFormTemplateComponent implements OnInit {
  // 🔐 Login simulado con arreglo
  esAdmin: boolean = false;
  usuario: string = '';
  contrasena: string = '';
  admins = [
    { usuario: 'admin', contrasena: 'admin123' },
    { usuario: 'supervisor', contrasena: 'super123' }
  ];

  // Template-driven form
  consulta = {
    nombre: '',
    telefono: '',
    tipo: '',
    mensaje: '',
    socio: ''
  };

  tiposConsulta: string[] = [
    'Información de clases',
    'Precios y membresías',
    'Horarios disponibles',
    'Otros'
  ];

  // Reactive form
  entrenadorForm!: FormGroup;

  especialidades: string[] = ['Zumba', 'Spinning', 'Pilates', 'Yoga', 'Body Pump', 'CrossFit', 'Boxeo', 'Kickboxing'];
  especialidadesSeleccionadas: string[] = [];
  enviado: boolean = false;
  hoy: string;

  // Listas para administración
  consultasGuardadas: any[] = [];
  aplicacionesGuardadas: any[] = [];

  editandoConsultaIndex: number | null = null;
  editandoAplicacionIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    const today = new Date();
    this.hoy = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.entrenadorForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      experiencia: ['', [Validators.required, Validators.minLength(10)]],
      celular: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      fecha: ['', [Validators.required, this.fechaNoPasadaValidator]]
    });

    this.cargarDatos();
  }

  fechaNoPasadaValidator(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    if (!valor) return null;
    const fechaIngresada = new Date(valor);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    return fechaIngresada < hoy ? { invalidDate: true } : null;
  }

  enviarConsulta(form: any) {
    if (form.valid) {
      const consultas = JSON.parse(localStorage.getItem('consultasContacto') || '[]');

      if (this.editandoConsultaIndex !== null) {
        consultas[this.editandoConsultaIndex] = this.consulta;
        this.editandoConsultaIndex = null;
      } else {
        consultas.push(this.consulta);
      }

      localStorage.setItem('consultasContacto', JSON.stringify(consultas));
      this.consulta = { nombre: '', telefono: '', tipo: '', mensaje: '', socio: '' };
      form.resetForm();
      this.cargarDatos();

      Swal.fire('¡Éxito!', 'Consulta procesada correctamente.', 'success');
    }
  }

  registrarEntrenador() {
    this.enviado = true;

    if (this.entrenadorForm.valid && this.especialidadesSeleccionadas.length > 0) {
      const nuevaAplicacion = {
        ...this.entrenadorForm.value,
        especialidades: this.especialidadesSeleccionadas
      };

      const entrenadores = JSON.parse(localStorage.getItem('aplicacionesEntrenador') || '[]');

      if (this.editandoAplicacionIndex !== null) {
        entrenadores[this.editandoAplicacionIndex] = nuevaAplicacion;
        this.editandoAplicacionIndex = null;
      } else {
        entrenadores.push(nuevaAplicacion);
      }

      localStorage.setItem('aplicacionesEntrenador', JSON.stringify(entrenadores));
      this.entrenadorForm.reset();
      this.especialidadesSeleccionadas = [];
      this.enviado = false;
      this.cargarDatos();

      Swal.fire('¡Éxito!', 'Aplicación enviada correctamente.', 'success');
    }
  }

  onCheckboxChange(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.especialidadesSeleccionadas.push(value);
    } else {
      const index = this.especialidadesSeleccionadas.indexOf(value);
      if (index >= 0) {
        this.especialidadesSeleccionadas.splice(index, 1);
      }
    }
  }

  especialidadesInvalidas(): boolean {
    return this.enviado && this.especialidadesSeleccionadas.length === 0;
  }

  get f() {
    return this.entrenadorForm.controls;
  }

  cargarDatos() {
    this.consultasGuardadas = JSON.parse(localStorage.getItem('consultasContacto') || '[]');
    this.aplicacionesGuardadas = JSON.parse(localStorage.getItem('aplicacionesEntrenador') || '[]');
  }

  eliminarConsulta(index: number) {
    this.consultasGuardadas.splice(index, 1);
    localStorage.setItem('consultasContacto', JSON.stringify(this.consultasGuardadas));
    this.cargarDatos();
  }

  eliminarAplicacion(index: number) {
    this.aplicacionesGuardadas.splice(index, 1);
    localStorage.setItem('aplicacionesEntrenador', JSON.stringify(this.aplicacionesGuardadas));
    this.cargarDatos();
  }

  editarConsulta(index: number) {
    this.consulta = { ...this.consultasGuardadas[index] };
    this.editandoConsultaIndex = index;
  }

  editarAplicacion(index: number) {
    const app = this.aplicacionesGuardadas[index];
    this.entrenadorForm.patchValue({
      nombre: app.nombre,
      experiencia: app.experiencia,
      celular: app.celular,
      fecha: app.fecha
    });
    this.especialidadesSeleccionadas = [...app.especialidades];
    this.editandoAplicacionIndex = index;
  }

  intentarLogin() {
    const valido = this.admins.find(
      admin => admin.usuario === this.usuario && admin.contrasena === this.contrasena
    );

    if (valido) {
      this.esAdmin = true;
      this.usuario = '';
      this.contrasena = '';
      Swal.fire('¡Bienvenido!', 'Has ingresado como administrador.', 'success');
    } else {
      Swal.fire('Error', 'Usuario o contraseña incorrectos.', 'error');
    }
  }

  logout() {
    this.esAdmin = false;
  }
}