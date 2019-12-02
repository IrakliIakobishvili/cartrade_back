import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ItemsController } from './items/items.controller';
// import { ItemsService } from './items/items.service';
import { ItemsModule } from './items/items.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CarsModule } from './cars/cars.module';
import config from './config/keys';
// import { CarsController } from './cars/cars.controller';

@Module({
  imports: [ItemsModule, MongooseModule.forRoot(config.mongoURI), UsersModule, AuthModule, CarsModule],
  controllers: [AppController],
  // controllers: [AppController, ItemsController],
  providers: [AppService],
  // providers: [AppService, ItemsService],
})
export class AppModule { }
