import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema } from './schemas/image.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'images', schema: ImageSchema }]),
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
