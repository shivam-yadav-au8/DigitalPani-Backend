import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './authentication/auth.module';
import { AppConfigModule } from './config/app/config.module';
import { MongoConfigModule } from './config/database/mongo/mongoConfig.module';
import { UserModule } from './modules/user/user.module';
import { TicketModule } from './modules/ticket/ticket.module';
@Module({
  imports: [
    AppConfigModule,
    MongoConfigModule,
    UserModule,
    AuthModule,
    TicketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
