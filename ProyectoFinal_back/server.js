require('dotenv').config();

const app = require('./app');

const { db, admin } = require('./config/firebase');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend escuchando en http://localhost:${PORT}`);
  console.log('🔗 Conectado a Firebase Firestore.');

  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH) {
    console.log(`🔑 Usando archivo de credenciales: ${process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH}`);
  } else {
    console.warn('⚠️ Advertencia: FIREBASE_SERVICE_ACCOUNT_KEY_PATH no está definida en .env');
  }
});