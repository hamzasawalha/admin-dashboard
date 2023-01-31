import { Injectable } from '@angular/core';
import { AbstractService } from '../abstract.service';
@Injectable({
  providedIn: 'root'
})
export class EditorialsService extends AbstractService {
  path = "editorials";
}
