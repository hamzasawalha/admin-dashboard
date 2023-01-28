import { Component } from '@angular/core';
import { ProgressLoaderService } from 'src/app/services/security/loading-progress/loading-progress.service';

@Component({
  selector: 'app-loading-progress',
  templateUrl: './loading-progress.component.html',
  styleUrls: ['./loading-progress.component.css']
})
export class LoadingProgressComponent {

constructor(public loader:ProgressLoaderService){}




}
