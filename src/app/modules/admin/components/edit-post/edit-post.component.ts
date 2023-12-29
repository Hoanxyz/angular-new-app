import {Component, OnInit} from '@angular/core';
import {CheckDeactivate} from "../../../../../guard/interface";
import {ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from "@angular/router";
import {map, Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../../shared/components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements CheckDeactivate, OnInit {
  id$ = this.activatedRoute.paramMap.pipe(
    map(params => params.get('id'))
  );

  isEditing = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  openDialog() {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Do you want to leave this page?'
      }
    });
    return ref.afterClosed();
  }

  checkDeactivate(currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !this.isEditing || this.openDialog();
  }
}
