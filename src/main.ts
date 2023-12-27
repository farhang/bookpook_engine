import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const fs = require('fs');
  const keyFile  = fs.readFileSync(__dirname + '/../bookpook.ir/privkey.pem');
  const certFile = fs.readFileSync(__dirname + '/../bookpook.ir/cert.pem');
  console.log(__dirname)
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: keyFile,
      cert: certFile,
    },
    cors: true,
  });

  await app.listen(3000);
}
bootstrap();
