import setupDatabase from './config/database';
import { app } from './server';
import env from './env/index';

async function bootstrap() {
  await setupDatabase();
  app.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT}`);
  });
}

bootstrap();
