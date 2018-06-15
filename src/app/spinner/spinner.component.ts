import {Component, Input, OnInit} from '@angular/core';
import {ConfigService} from '../service/config.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  @Input() loading = false;

  constructor(private configService: ConfigService) { }

  ngOnInit() {
    let timeout = 7000; // 7 sec
    if ( this.configService.env !== 'prod') {
      timeout = 14000;
    }
    setTimeout(() => this.loading = false, timeout);
  }

}
