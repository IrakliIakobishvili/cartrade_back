import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { ItemSchema } from './schemas/item.schema';
import { AuthModule } from './../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Item', schema: ItemSchema }]),
    AuthModule
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule { }
