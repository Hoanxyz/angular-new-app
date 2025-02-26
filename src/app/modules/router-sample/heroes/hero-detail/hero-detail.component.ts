import {Component, OnInit} from '@angular/core';
import {Hero} from "../models/hero";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {HeroService} from "../services/hero.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  hero$!: Observable<Hero>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heroService: HeroService
  ) {
  }

  ngOnInit() {
    // this.hero$ = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) => {
    //     let id = params.get('id');
    //     let idToNumb = (id !== null && id !== undefined) ? +id : 0
    //     return this.heroService.getHero(idToNumb);
    //   })
    // );

    const id = this.route.snapshot.paramMap.get('id');
    const idToNumb = (id !== null && id !== undefined) ? +id : 0
    this.hero$ = this.heroService.getHero(idToNumb);
  }

  gotoHeroes(hero: Hero) {
    const heroId = hero ? hero.id : null;
    const navigationExtra: NavigationExtras = {
      queryParams: {
        id: heroId,
        foo: 'foo'
      }
    }
    this.router.navigate(['/router-sample/superheroes/heroes-list'], navigationExtra);
  }
}
