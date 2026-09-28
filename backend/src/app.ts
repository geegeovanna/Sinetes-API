import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    mensagem: 'API de Sinetes está funcionando!',
  });
});

export default app;