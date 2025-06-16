const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/firebase');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/api/usuarios', async (req, res) => {
  try {
    const snapshot = await db.collection('usuarios').get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor Node escuchando en puerto ${PORT}`));
