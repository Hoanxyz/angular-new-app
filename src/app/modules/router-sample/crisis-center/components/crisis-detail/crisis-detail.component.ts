import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.scss']
})
export class CrisisDetailComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {

  }

  gotoCrises(): void {
    const crisisId = 3;
    this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route })
  }
}
