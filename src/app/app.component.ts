import { parseTemplate } from '@angular/compiler';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { PocService } from './shares/poc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'baseProjectV12';

  constructor(private pocService: PocService) {
    this.getPoc();
  }

  getPoc() {
     this.pocService.getAll().subscribe(resp => console.log(resp));
  }
}
