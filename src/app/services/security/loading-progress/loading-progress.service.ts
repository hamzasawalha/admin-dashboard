import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ProgressLoaderService {
  isLoading : boolean = false;

  private loading: boolean = false;

  constructor() { }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  getLoading(): boolean {
    return this.loading;
  }
}