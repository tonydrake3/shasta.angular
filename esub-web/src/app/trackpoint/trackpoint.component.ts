import { Component } from '@angular/core';

@Component({
    selector: 'esub-trackpoint',
    styles: [],
    template: `<router-outlet></router-outlet>`
})

export class TrackpointComponent {
  constructor() {
    console.log('TrackpointComponent constructor');
  }
}

@Component({
  templateUrl: './dashboard.component.html'
})

export class TrackpointNavigationComponent {
  constructor() {
    console.log('TrackpointNavigationComponent constructor');
  }
}
