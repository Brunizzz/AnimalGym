const express = require('express');
const cors = require('cors');
const db = require('./config/firebase');

const app = express();
app.use(cors());
app.use(express.json()); // ✅ Esta línea permite que req.body funcione

app.get('/api/usuarios', async (req, res) => {
  try {
    const snapshot = await db.collection('usuarios').get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta para bloquear o desbloquear usuario
app.put('/api/usuarios/:id/bloqueo', async (req, res) => {
  const { id } = req.params;
  const { estado, motivo, realizadoPor } = req.body;

  try {
    // Actualizar estado del usuario
    const usuarioRef = db.collection('usuarios').doc(id);
    await usuarioRef.update({ estado });

    // Agregar entrada en bitácora
    const bitacoraRef = db.collection('bitacoraBloqueos').doc();
    await bitacoraRef.set({
      accion: estado ? 'desbloqueado' : 'bloqueado',
      fecha: new Date(),
      motivo,
      realizadoPor: `/usuarios/${realizadoPor}`,
      usuarioAfectado: `/usuarios/${id}`
    });

    res.json({ message: `Usuario ${estado ? 'desbloqueado' : 'bloqueado'} correctamente.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor Node escuchando en puerto ${PORT}`));
