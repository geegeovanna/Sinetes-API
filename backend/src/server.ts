import app from './app.js';
import database from './config/database.js';
import './models/Sinete.js';

const PORT = 3000;

const startServer = async (): Promise<void> => {
  try {
    await database.authenticate();

    console.log('Conexão com PostgreSQL realizada com sucesso!');

    await database.sync();

    console.log('Banco de dados sincronizado com sucesso!');

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao conectar ao PostgreSQL:', error);
    process.exit(1);
  }
};

startServer();