const express = require('express');
const cors = require('cors'); // Para permitir peticiones desde tu frontend Angular
const helmet = require('helmet'); // Seguridad: Establece varios encabezados HTTP
const rateLimit = require('express-rate-limit'); // Para limitar peticiones (ej. en el login)
const mongoSanitize = require('express-mongo-sanitize'); // Aunque uses Firestore, es buena práctica si cambias

const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/products.routes');
const formRoutes = require('./routes/forms.routes');
const adminRoutes = require('./routes/admin.routes');
// ... importa todas tus rutas

const app = express();

// --- Middlewares globales ---

// Seguridad básica de HTTP
app.use(helmet());

// Habilitar CORS para permitir solicitudes desde tu frontend Angular
// Ajusta el origin en producción para que solo tu dominio de Angular pueda acceder
app.use(cors({
  origin: 'http://localhost:4200' // O tu dominio de Angular en producción (ej. https://your-gym-app.web.app)
}));

// Body parser para manejar solicitudes JSON
app.use(express.json());

// Sanear datos para prevenir ataques de inyección NoSQL (buena práctica general)
app.use(mongoSanitize());

// Configuración de límite de tasa para todas las rutas (ajusta según tus necesidades)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máximo 100 peticiones por ventana
  message: "Demasiadas peticiones desde esta IP, por favor intenta de nuevo en 15 minutos."
});
app.use(apiLimiter);

// --- Definición de Rutas ---
// Prefija tus rutas con /api para una mejor organización
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/admin', adminRoutes);
// ... registra todas tus rutas aquí

// --- Ruta por defecto (opcional) ---
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de tu Gimnasio!');
});

// --- Manejo de rutas no encontradas (404) ---
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// --- Manejo global de errores (último middleware) ---
app.use((err, req, res, next) => {
  console.error(err.stack); // Registra el error en la consola del servidor
  res.status(500).json({ message: 'Algo salió mal en el servidor!', error: err.message });
});

module.exports = app; // Exporta la instancia de la aplicación Express