import { Injectable } from '@angular/core';
import { AbstractService } from '../abstract.service';
@Injectable({
  providedIn: 'root'
})
export class LessonsService extends AbstractService{
  path = "lessons";
}
