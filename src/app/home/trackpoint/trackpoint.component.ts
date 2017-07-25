import {Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { NavigationLink } from '../../models/NavigationLink';

import {sidebarConfiguration} from '../shared/configuration/menu.configuration';
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

  constructor(private route: ActivatedRoute) {}

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

      setTimeout(() => {

          // this.hubConnection = $['connection'];
          // this.hubConnection.hub.url = 'http://test.develop.shasta.esubonline.com/signalr';
          // this.hubConnection.hub.logging = true;
          //
          // this.hubConnection.hub.start({ withCredentials: false, transport: 'serverSentEvents'})
          //     .done((response) => {
          //         console.log('connected', response.transport.name);
          //         this.hubProxy = this.hubConnection.testHub;
          //         console.log(this.hubProxy.client);
          //         this.hubProxy.client.send = function (message) {
          //             console.log('connected', message);
          //         };
          //     })
          //     .fail((error) => {
          //         console.log('not connected' + error);
          //     });

           const connection = $['hubConnection']();
           connection.url = 'http://test.develop.shasta.esubonline.com/signalr';
           this.hubProxy = connection.createHubProxy('testhub');

           this.registerOnServerEvents();

          connection.start({ withCredentials: false, transport: 'serverSentEvents'})
               .done(function (data) {
                   console.log('connected', data.transport.name);

               })
               .fail(function (a) {
                   console.log('not connected' + a);
               });
      });
  }

    private registerOnServerEvents(): void {
        this.hubProxy.on('send', (name, message) => {
            console.log(name, message);
        });
    }
}
