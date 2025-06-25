import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  private http = inject(HttpClient);

  // Usuarios por tipo
  tipoChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Administrador', 'Cliente'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#00FF88', '#FF0066'],
      }
    ]
  };

  // Subscripciones
  subscripcionChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Subscripción 1', 'Subscripción 2', 'Subscripción 3'],
    datasets: [
      {
        label: 'Total de Usuarios',
        data: [0, 0, 0],
        backgroundColor: ['#00FF88', '#00CC66', '#009944']
      }
    ]
  };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#00FF88'
        }
      }
    }
  };

  ngOnInit(): void {
    this.obtenerUsuariosPorTipo();
    this.obtenerUsuariosPorSubscripcion();
  }

  obtenerUsuariosPorTipo() {
    this.http.get<any>('http://localhost:3000/api/reportes/usuarios-tipo')
      .subscribe(data => {
        this.tipoChartData.datasets[0].data = [data.admin || 0, data.cliente || 0];
      });
  }

  obtenerUsuariosPorSubscripcion() {
    this.http.get<any>('http://localhost:3000/api/reportes/suscripciones')
      .subscribe(data => {
        this.subscripcionChartData.datasets[0].data = [data['1'] || 0, data['2'] || 0, data['3'] || 0];
      });
  }
}