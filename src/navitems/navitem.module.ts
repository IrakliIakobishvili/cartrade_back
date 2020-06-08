import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NavItemsController } from './navitem.controller';
import { NavItemsService } from './navitem.service';
import { NavitemSchema } from './schemas/comment.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Navitem', schema: NavitemSchema }]),
    AuthModule
  ],
  controllers: [NavItemsController],
  providers: [NavItemsService],
})
export class NavItemsModule { }
