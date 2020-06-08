import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NavigationController } from './navigation.controller';
import { NavigationService } from './navigation.service';
// import { NavigationSchema } from './schemas/navigation.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Navigation } from './entity/navigation.entity';

@Module({
  imports: [
  
  // MongooseModule.forFeature([{ name: 'Navigation', schema: NavigationSchema }])
    TypeOrmModule.forFeature([Navigation])
  ],
  controllers: [NavigationController],
  providers: [NavigationService],
})
export class NavigationModule { }
