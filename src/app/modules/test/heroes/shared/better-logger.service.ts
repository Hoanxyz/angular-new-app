import { Injectable } from '@angular/core';
import {LoggerService} from "./logger.service";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root',
})
export class BetterLoggerService extends LoggerService {

  constructor(
    private userService: UserService
  ) {
    super();
  }

  override log(msg: string) {
    const name = this.userService.user.name;
    super.log(`Massage to ${name}: ${msg}`);
    console.log(super.logs);
  }
}
