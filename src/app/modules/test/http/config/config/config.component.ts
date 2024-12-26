import { Component } from '@angular/core';
import {ConfigService} from "../config.service";
import {Config} from "../model";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent {

  config!: {};
  headers: any;
  constructor(
    private configService: ConfigService
  ) {
    this.showConfigResponse();
  }

  showConfig() {
    this.configService.getConfig().subscribe((data: Config) => this.config = {...data});
  }

  showConfigResponse() {
    this.configService.getConfigResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        console.log(resp);
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);

        // access the body directly, which is typed as `Config`.
        this.config = { ... resp.body };
      });
  }
}
