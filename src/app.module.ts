import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './components/users/users.module';
import { RolesModule } from './components/roles/roles.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
        envFilePath: ['.env.local', '.env.production', '.env'],
      }
    ),
    UsersModule, 
    UsersModule, 
    RolesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
