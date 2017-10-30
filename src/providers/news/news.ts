import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Inshorts from 'inshorts';
/*
  Generated class for the NewsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class NewsProvider {

  inshorts: any;

  constructor(public http: Http) {
    this.inshorts = Inshorts.init();
  }
}
