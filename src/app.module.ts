import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
