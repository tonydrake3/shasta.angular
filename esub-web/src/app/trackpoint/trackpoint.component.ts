import { Component } from '@angular/core';

@Component({
    selector: 'esub-trackpoint',
    styles: [],
    template: `<router-outlet></router-outlet>`
})

export class TrackpointComponent {
  constructor() {
    console.log("TrackpointComponent constructor");
  }
}

@Component({
    template: `
      <iframe src="https://en.wikipedia.org/wiki/LOLCODE" style="
      height: 100vh;
      width: 100%;
      border: none;
      position: relative;
      top: -141px;
      left: -185px;"></iframe>`
})

export class TrackpointNavigationComponent {
  constructor() {
    console.log("TrackpointNavigationComponent constructor");
  }
}
