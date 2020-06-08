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
import { CommentsModule } from './comments/comments.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { InvoicesModule } from './invoices/invoices.module';
import { GalleryModule } from './gallery/gallery.module';
import { NavigationModule } from './navigation/navigation.module';
import { NavItemsModule } from './navitems/navitem.module';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [
    MongooseModule.forRoot(config.mongoURI),
    // DatabaseModule,
    ItemsModule, 
    UsersModule, 
    AuthModule, 
    CarsModule, 
    CommentsModule, 
    AnnouncementsModule, 
    InvoicesModule, 
    GalleryModule, 
    NavigationModule, 
    NavItemsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
