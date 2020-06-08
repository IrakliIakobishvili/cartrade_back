import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NavigationController } from './navigation.controller';
import { NavigationService } from './navigation.service';
import { NavigationSchema } from './schemas/navigation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Navigation', schema: NavigationSchema }])
  ],
  controllers: [NavigationController],
  providers: [NavigationService],
})
export class NavigationModule { }
