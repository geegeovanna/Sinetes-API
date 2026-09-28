import cors from 'cors';
import express from 'express';
import sineteRoutes from './routes/SineteRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    mensagem: 'API de Sinetes está funcionando!',
  });
});

app.use('/api/sinetes', sineteRoutes);

export default app;