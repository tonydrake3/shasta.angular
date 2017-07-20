import {Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { NavigationLink } from '../../models/NavigationLink';

import {sidebarConfiguration} from '../shared/configuration/menu.configuration';
import {SignalRService} from '../../shared/services/signalr.service';
import {ChannelService, ConnectionState, SignalrWindow} from '../../shared/services/channel.service';
import {Observable} from 'rxjs/Observable';


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
    connectionState$: Observable<string>;
    hubConnection;
    hubProxy;

  constructor(private route: ActivatedRoute, @Inject(SignalrWindow) private window: SignalrWindow) {

      // Let's wire up to the signalr observables
      //
      // this.connectionState$ = this._signalr.connectionState$
      //     .map((state: ConnectionState) => { return ConnectionState[state]; });
      //
      // this._signalr.error$.subscribe(
      //     (error: any) => { console.warn(error); },
      //     (error: any) => { console.error("errors$ error", error); }
      // );
      //
      // // Wire up a handler for the starting$ observable to log the
      // //  success/fail result
      // //
      // this._signalr.starting$.subscribe(
      //     () => { console.log("signalr service has been started"); },
      //     () => { console.warn("signalr service failed to start!"); }
      // );

      const connection = this.window.$.hubConnection();
      connection.url = 'http://test.develop.shasta.esubonline.com/signalr';
      this.hubProxy = connection.createHubProxy('testhub');

      this.registerOnServerEvents();
      // this.hubConnection = this.window.$.hubConnection();
      // this.hubConnection.url = 'http://test.develop.shasta.esubonline.com/signalr';
      // this.hubConnection.name = 'testHub';
      // this.hubProxy = this.hubConnection.createHubProxy('testHub');

     connection.start({ withCredentials: false, transport: 'serverSentEvents'})
          .done(function (data) {
              console.log('connected', data.transport.name);

          })
          .fail(function (a) {
              console.log('not connected'+ a);
          });


  }

  ngOnInit(): void {
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

    private registerOnServerEvents(): void {
        this.hubProxy.on('send', (data) => {
            console.log('received in SignalRService: ' + JSON.stringify(data));

        });
    }
}

// constructor (private _signalR: SignalR) {
//
//     const connection = this._signalR.createConnection();
//     connection.status.subscribe(
//         (s) => {
//             console.warn(s.name);
//         }
//     );
//     connection.start().then(
//         (c) => {
//             console.log('c');
//         }
//     );
// }
