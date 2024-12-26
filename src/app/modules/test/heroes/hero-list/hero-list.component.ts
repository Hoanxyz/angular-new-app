import { Component } from '@angular/core';
import {Hero} from "../shared/hero";
import {HeroService} from "../shared/hero.service";
import {LoggerService} from "../shared/logger.service";

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent {
  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
    private logger: LoggerService
  ) {
    this.logger.log('ha ha ha');
    this.heroes = this.heroService.getHeroes();
  }
}
