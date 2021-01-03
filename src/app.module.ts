import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from './components/auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DatabaseConectionModule } from './drivers/database-conection/database-conection.module';

@Module({
  imports: [
    AuthModule,
    DatabaseConectionModule,
    ConfigModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
