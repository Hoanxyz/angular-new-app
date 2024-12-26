import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {IUrl} from "../../models/models";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() listUrls!: IUrl[];
  @Input() loginRedirect!: string;
  @Input() logoutRedirect!: string;
  @Input() logoLink!: string
  user: any;
  baseURL = document.baseURI;

  constructor(
    private router: Router,
    private sharedService: SharedService
    ) {
  }

  ngOnInit(): void {
    this.innitUser();
    this.sharedService.reloadUser$.subscribe(
      () => {
        this.innitUser();
      }
    )
  }

  innitUser() {
    const userData = localStorage.getItem("currentUser");
    this.user = userData ? JSON.parse(userData) : null;
  }

  logout(): void {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken");
    this.sharedService.emmitLogout();
    this.router.navigate([this.logoutRedirect]);
    this.user = localStorage.getItem("currentUser");
  }

  goToLogin(): void {
    this.router.navigate([this.loginRedirect]);
  }

  toggleSearch() {
    this.sharedService.emmitToggleSearch();
  }

  changeLocation(url: string) {
    this.router.navigate([url]);
  }
}
