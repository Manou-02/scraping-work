import { LocationService } from './location.service';
import { Controller, Get } from '@nestjs/common';

@Controller('location')
export class LocationController {
    constructor(private locationService : LocationService){}
    
    @Get()
    getLocation(){
        return this.locationService.getFinalLocation();
    }

}
