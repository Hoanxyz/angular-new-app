import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  logs: string[] = [];

  constructor() { }

  log(msg: string) {
    this.logs.push(msg);
    console.log(this.logs);
  }
}
