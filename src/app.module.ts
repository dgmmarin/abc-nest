import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './components/users/users.module';
import { RolesModule } from './components/roles/roles.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from 'config/typeorm.config';
import { OrdersModule } from './components/orders/orders.module';
import { OrderProductsModule } from './components/order-products/order-products.module';
import { ProductsModule } from './components/products/products.module';
import { RevisionsModule } from './components/revisions/revisions.module';
import { EmailsModule } from './components/emails/emails.module';
import { BalancesModule } from './components/balances/balances.module';
import { CoinsModule } from './components/coins/coins.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ConfigModule.forRoot(
      {
        isGlobal: true,
        envFilePath: '.env',
      }
    ),
    UsersModule,
    RolesModule,
    OrdersModule,
    OrderProductsModule,
    ProductsModule,
    RevisionsModule,
    EmailsModule, 
    BalancesModule, 
    CoinsModule, 
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule { }
