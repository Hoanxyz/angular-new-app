import {Component, OnInit} from '@angular/core';
import {debounce, debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from "rxjs";
import {Hero} from "../../models/hero";
import {HeroService} from "../../services/hero.service";

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private searchTerm = new Subject<string>();

  constructor(
    private heroService: HeroService
  ) {
  }
  ngOnInit() {
    this.heroes$ = this.searchTerm.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHero(term))
    );
  }

  search(term: string): void {
    this.searchTerm.next(term);
  }
}
