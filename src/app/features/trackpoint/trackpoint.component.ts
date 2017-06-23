import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { NavigationLink } from '../../models/NavigationLink';

// TODO delete me
import { DEVMockDataService } from '../../shared/DEV-mock-data.service';
import {sidebarConfiguration} from '../../models/configuration/menuConfiguration';

@Component({
    selector: 'esub-trackpoint',
    styles: [],
    template: `<router-outlet></router-outlet>`
})

export class TrackpointComponent {
  constructor() { }
}

@Component({
  templateUrl: './trackpoint.component.html'
})

export class TrackpointNavigationComponent implements OnInit {
  public page: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
      console.log('OnInit');
    this.route.params
      .subscribe(params => {
        const trackPointId = params['id'];

        sidebarConfiguration.forEach((navLink: NavigationLink) => {
          if (navLink.$id === trackPointId) {
            this.page = JSON.stringify(navLink);
          }
        });
      });
  }
}
