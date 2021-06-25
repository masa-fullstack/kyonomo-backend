import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '50mb' })); // jsonをパースする際のlimitを設定
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // urlencodeされたボディをパースする際のlimitを設定
  app.enableCors({
    origin: '*',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
