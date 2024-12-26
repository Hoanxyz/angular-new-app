import { Injectable } from '@angular/core';
import {HEROES} from "./mock-hero";
import {LoggerService} from "./logger.service";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private logger: LoggerService
  ) {
    console.log(this.logger);
  }

  getHeroes() {
    this.logger.log('Getting heroes ...');
    return HEROES;
  }
}
