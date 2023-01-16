import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfigService } from './mongoConfig.service';
import 'dotenv/config';
/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URI)],
  providers: [ConfigService, MongoConfigService],
  exports: [ConfigService, MongoConfigService],
})
export class MongoConfigModule {}
