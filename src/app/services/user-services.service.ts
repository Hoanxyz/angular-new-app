import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  currentUser = {
    userId: '1',
  };
  constructor() {}
}
