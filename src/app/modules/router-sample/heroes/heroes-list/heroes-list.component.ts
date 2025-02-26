import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../services/hero.service";
import {Observable, switchMap} from "rxjs";
import {Hero} from "../models/hero";

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss'],
})
export class HeroesListComponent implements OnInit {
  hero$!: Observable<Hero[]>;
  selectedId!: number;
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.hero$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        this.selectedId = (id !== null && id !== undefined) ? +id : 0;
        return this.heroService.getHeroes();
      })
    )
  }
}
