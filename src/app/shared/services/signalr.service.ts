import {Injectable} from '@angular/core';

@Injectable()
export class SignalRService {

    // signalR connection
    private connection: SignalR;

    // signalR Proxy
    private proxy: SignalR.Hub.Proxy;

    constructor () {

        this.connection = $.connection;

        this.proxy = $.connection.hub.createHubProxy();
    }
}
