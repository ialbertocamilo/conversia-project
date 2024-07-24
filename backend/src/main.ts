import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {FastifyAdapter} from '@nestjs/platform-fastify';

async function bootstrap() {
    const app = await NestFactory.create(
        AppModule,
        new FastifyAdapter({logger: true}),
    );
    app.enableCors({
        allowedHeaders: '*',
        origin: '*',
        credentials: true
    })
    await app.listen(3000, '0.0.0.0');
}

bootstrap();
