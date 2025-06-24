const express = require('express');
const cors = require('cors');
const db = require('./config/firebase');

const app = express();
app.use(cors());
app.use(express.json()); 

//Usuarios
//Obtener Usuarios
app.get('/api/usuarios', async (req, res) => {
  try {
    const snapshot = await db.collection('usuarios').get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Bloquear y desbloquear usuarios
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

//Productos
//Obtener Productos
app.get('/api/productos', async (req, res) => {
  try {
    const snapshot = await db.collection('productos').get();
    const productos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Agregar Productos
app.post('/api/productos', async (req, res) => {
  try {
    const nuevoProducto = req.body;
    const ref = await db.collection('productos').add(nuevoProducto);
    res.status(201).json({ id: ref.id, ...nuevoProducto });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Editar Productos
app.put('/api/productos/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    await db.collection('productos').doc(id).update(data);
    res.json({ message: 'Producto actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Eliminar Productos
app.delete('/api/productos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection('productos').doc(id).delete();
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener producto por ID
app.get('/api/productos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await db.collection('productos').doc(id).get();
    if (!doc.exists) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Servidor Node
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor Node escuchando en puerto ${PORT}`));
