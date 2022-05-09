import { LocationService } from './bienici/location/location.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationController } from './bienici/location/location.controller';
import { LocationModule } from './bienici/location/location.module';

@Module({
  imports: [LocationModule],
  controllers: [AppController, LocationController],
  providers: [AppService, LocationService],
})
export class AppModule {}
