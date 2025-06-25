import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

//se declara globalmente para que TypeScript lo recozca 
declare var paypal: any;

@Component({
  selector: 'app-resumen-compra',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen-compra.html',
  styleUrl: './resumen-compra.css'
})
export class ResumenCompra implements OnInit {
  carrito: { producto: any, cantidad: number }[] = [];
  total = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const estado = history.state;
    this.carrito = estado['carrito'] || [];

    if (!this.carrito || this.carrito.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Carrito vacío',
        text: 'No hay productos para mostrar en el resumen.',
        confirmButtonText: 'Volver a tienda'
      }).then(() => {
        this.router.navigate(['/compra-productos']);
      });
    } else {
      this.total = this.carrito.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0);
    }
  }

  //cargamos el script de PayPal

  ngAfterViewInit(): void {
    if (this.total > 0) {
      this.loadPaypalScript();
    }
  }

  private loadPaypalScript(): void {
    // Carga el script de PayPal
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=ASbcMivrvFX8y_cPXr4HIX4BnbGQ0AVyoeC6sWfDe3xDsJoGmWjy1c8hb82wQVzyM98Far-CFA2_oH2X&currency=MXN`; // CAMBIA TU_CLIENT_ID_DE_SANDBOX y ajusta la moneda si es necesario
    script.onload = () => {
      this.renderPaypalButtons();
    };
    script.onerror = () => {
      console.error('Error al cargar el SDK de PayPal.');
      Swal.fire({
        icon: 'error',
        title: 'Error de carga',
        text: 'No se pudo cargar el botón de pago de PayPal. Intenta de nuevo más tarde.',
      });
    };
    document.body.appendChild(script);
  }

  private renderPaypalButtons(): void {
    paypal.Buttons({
      // Configuración del entorno (sandbox para pruebas)
      env: 'sandbox', // Asegúrate de que está en 'sandbox'

      // Crea el pedido en tu backend
      createOrder: (data: any, actions: any) => {
        // Llama a tu backend para crear la orden de PayPal
        return fetch('http://localhost:3000/api/paypal/create-order', { // Reemplaza con la URL de tu backend
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            items: this.carrito.map(item => ({
              name: item.producto.nombre,
              quantity: item.cantidad,
              unit_amount: {
                currency_code: 'MXN', //Moneda
                value: item.producto.precio.toFixed(2) // Formato a 2 decimales
              }
            })),
            purchase_units: [{
              amount: {
                currency_code: 'MXN', // Asegúrate de que la moneda coincida
                value: this.total.toFixed(2), // Formato a 2 decimales
                breakdown: {
                    item_total: {
                        currency_code: 'MXN',
                        value: this.total.toFixed(2)
                    }
                }
              }
            }]
          })
        })
        .then(response => response.json())
        .then(order => order.id) // Retorna el ID de la orden creada por PayPal
        .catch(error => {
          console.error('Error al crear el pedido de PayPal:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error de pago',
            text: 'No se pudo iniciar el proceso de pago. Intenta de nuevo más tarde.',
          });
          return Promise.reject(error); // Rechaza la promesa para que PayPal sepa que falló
        });
      },

      // Captura el pago después de que el usuario lo aprueba
      onApprove: (data: any, actions: any) => {
        // Llama a tu backend para capturar la orden de PayPal
        return fetch('http://localhost:3000/api/paypal/capture-order', { // Reemplaza con la URL de tu backend
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            orderID: data.orderID // El ID de la orden que PayPal autorizó
          })
        })
        .then(response => response.json())
        .then(captureResponse => {
          console.log('Pago capturado:', captureResponse);
          // Muestra un mensaje de éxito y navega
          Swal.fire({
            icon: 'success',
            title: 'Compra realizada con éxito',
            text: 'Gracias por tu compra',
            showConfirmButton: false,
            timer: 2000
          });
          setTimeout(() => {
            this.router.navigate(['/compra-productos']);
          }, 2000);
        })
        .catch(error => {
          console.error('Error al capturar el pago:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error de pago',
            text: 'Hubo un problema al procesar tu pago. Intenta de nuevo o contacta a soporte.',
          });
        });
      },

      // Maneja errores o cuando el usuario cancela
      onCancel: (data: any) => {
        console.log('Pago cancelado:', data);
        Swal.fire({
          icon: 'info',
          title: 'Pago Cancelado',
          text: 'Has cancelado el proceso de pago.',
        });
      },

      onError: (err: any) => {
        console.error('Error de PayPal:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error de PayPal',
          text: 'Ocurrió un error inesperado con PayPal. Intenta de nuevo.',
        });
      }
    }).render('#paypal-button-container'); // Renderiza los botones en el div que creamos
  }

  pagar() {
    Swal.fire({
      icon: 'success',
      title: 'Compra realizada con éxito',
      text: 'Gracias por tu compra',
      showConfirmButton: false,
      timer: 2000
    });

    setTimeout(() => {
      this.router.navigate(['/compra-productos']);
    }, 2000);
  }
}
