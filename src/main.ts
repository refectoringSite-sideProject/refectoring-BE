import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/exception/http-exception.filter";
import { winstonLogger } from "./common/middleware/winstonLogger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = winstonLogger;
  app.useLogger(logger);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle("Refectoring")
    .setDescription("The Refectoring API description")
    .setVersion("1.0")
    .addTag("refector")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
bootstrap();
