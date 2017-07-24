// import {EventEmitter, Inject, Injectable} from '@angular/core';
// import {Observable} from 'rxjs/Observable';
// import {
//     ChannelConfig, ChannelEvent, ChannelSubject, ConnectionState,
//     SignalrWindow
// } from './configuration/signalr.configuration';
// import {Subject} from 'rxjs/Subject';
//
// @Injectable()
// export class SignalRService {
//
//     // // Declare the variables
//     // private proxy: any;
//     // private proxyName = 'testHub';
//     // private connection: any;
//     //
//     // // create the Event Emitter
//     // public messageReceived: EventEmitter <any> ;
//     // public connectionEstablished: EventEmitter <boolean> ;
//     // public connectionExists: Boolean;
//     //
//     // constructor() {
//     //
//     //     console.log('SignalRService CTOR', $.fn.jquery);
//     //     // Constructor initialization
//     //     this.connectionEstablished = new EventEmitter <boolean> ();
//     //     this.messageReceived = new EventEmitter <any> ();
//     //     this.connectionExists = false;
//     //
//     //     // create hub connection
//     //     // this.connection = $.hubConnection('http://test.develop.shasta.esubonline.com/');
//     //
//     //     // create new proxy as name already given in top
//     //     this.proxy = this.connection.createHubProxy(this.proxyName);
//     //
//     //     // register on server events
//     //     this.registerOnServerEvents();
//     //
//     //     // call the connection start method to start the connection to send and receive events.
//     //     this.startConnection();
//     // }
//     //
//     // // method to hit from client
//     // // public sendTime() {
//     // //     // server side hub method using proxy.invoke with method name pass as param
//     // //     this.proxy.invoke('GetRealTime');
//     // // }
//     //
//     // // check in the browser console for either signalr connected or not
//     // private startConnection(): void {
//     //     console.log('SignalRService startConnection');
//     //     this.connection.start().done((data: any) => {
//     //         console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id);
//     //         this.connectionEstablished.emit(true);
//     //         this.connectionExists = true;
//     //     }).fail((error: any) => {
//     //         console.log('Could not connect ' + error);
//     //         this.connectionEstablished.emit(false);
//     //     });
//     // }
//     //
//     // private registerOnServerEvents(): void {
//     //
//     //     this.proxy.on('setRealTime', (data: any) => {
//     //         console.log('received in SignalRService: ' + JSON.stringify(data));
//     //         this.messageReceived.emit(data);
//     //     });
//     // }
//
//     starting$: Observable<any>;
//
//     connectionState$: Observable<ConnectionState>;
//
//     error$: Observable<string>;
//
//     private connectionStateSubject = new Subject<ConnectionState>();
//     private startingSubject = new Subject<any>();
//     private errorSubject = new Subject<any>();
//
//     private hubConnection: any;
//     private hubProxy: any;
//
//     private subjects = new Array<ChannelSubject>();
//
//     constructor(
//         @Inject(SignalrWindow) private window: SignalrWindow,
//         @Inject('channel.config') private channelConfig: ChannelConfig
//     ) {
//         if (this.window.$ === undefined || this.window.$.hubConnection === undefined) {
//             throw new Error('The variable "$" or the .hubConnection() function are not defined...
//                  please check the SignalR scripts have been loaded properly');
//         }
//
//         this.connectionState$ = this.connectionStateSubject.asObservable();
//         this.error$ = this.errorSubject.asObservable();
//         this.starting$ = this.startingSubject.asObservable();
//
//         this.hubConnection = this.window.$.hubConnection();
//         this.hubConnection.url = channelConfig.url;
//         this.hubProxy = this.hubConnection.createHubProxy(channelConfig.hubName);
//
//         // Define handlers for the connection state events
//         //
//         this.hubConnection.stateChanged((state: any) => {
//             let newState = ConnectionState.Connecting;
//
//             switch (state.newState) {
//                 case this.window.$.signalR.connectionState.connecting:
//                     newState = ConnectionState.Connecting;
//                     break;
//                 case this.window.$.signalR.connectionState.connected:
//                     newState = ConnectionState.Connected;
//                     break;
//                 case this.window.$.signalR.connectionState.reconnecting:
//                     newState = ConnectionState.Reconnecting;
//                     break;
//                 case this.window.$.signalR.connectionState.disconnected:
//                     newState = ConnectionState.Disconnected;
//                     break;
//             }
//
//             // Push the new state on our subject
//             //
//             this.connectionStateSubject.next(newState);
//         });
//
//         // Define handlers for any errors
//         //
//         this.hubConnection.error((error: any) => {
//             // Push the error on our subject
//             //
//             this.errorSubject.next(error);
//         });
//
//         this.hubProxy.on("onEvent", (channel: string, ev: ChannelEvent) => {
//             //console.log(`onEvent - ${channel} channel`, ev);
//
//             // This method acts like a broker for incoming messages. We
//             //  check the interal array of subjects to see if one exists
//             //  for the channel this came in on, and then emit the event
//             //  on it. Otherwise we ignore the message.
//             //
//             let channelSub = this.subjects.find((x: ChannelSubject) => {
//                 return x.channel === channel;
//             }) as ChannelSubject;
//
//             // If we found a subject then emit the event on it
//             //
//             if (channelSub !== undefined) {
//                 return channelSub.subject.next(ev);
//             }
//         });
//
//     }
//
//     /**
//      * Start the SignalR connection. The starting$ stream will emit an
//      * event if the connection is established, otherwise it will emit an
//      * error.
//      */
//     start(): void {
//         // Now we only want the connection started once, so we have a special
//         //  starting$ observable that clients can subscribe to know know if
//         //  if the startup sequence is done.
//         //
//         // If we just mapped the start() promise to an observable, then any time
//         //  a client subscried to it the start sequence would be triggered
//         //  again since it's a cold observable.
//         //
//         this.hubConnection.start()
//             .done(() => {
//                 this.startingSubject.next();
//             })
//             .fail((error: any) => {
//                 this.startingSubject.error(error);
//             });
//     }
//
//     /**
//      * Get an observable that will contain the data associated with a specific
//      * channel
//      * */
//     sub(channel: string): Observable<ChannelEvent> {
//
//         // Try to find an observable that we already created for the requested
//         //  channel
//         //
//         let channelSub = this.subjects.find((x: ChannelSubject) => {
//             return x.channel === channel;
//         }) as ChannelSubject;
//
//         // If we already have one for this event, then just return it
//         //
//         if (channelSub !== undefined) {
//             console.log(`Found existing observable for ${channel} channel`)
//             return channelSub.subject.asObservable();
//         }
//
//         //
//         // If we're here then we don't already have the observable to provide the
//         //  caller, so we need to call the server method to join the channel
//         //  and then create an observable that the caller can use to received
//         //  messages.
//         //
//
//         // Now we just create our internal object so we can track this subject
//         //  in case someone else wants it too
//         //
//         channelSub = new ChannelSubject();
//         channelSub.channel = channel;
//         channelSub.subject = new Subject<ChannelEvent>();
//         this.subjects.push(channelSub);
//
//         // Now SignalR is asynchronous, so we need to ensure the connection is
//         //  established before we call any server methods. So we'll subscribe to
//         //  the starting$ stream since that won't emit a value until the connection
//         //  is ready
//         //
//         this.starting$.subscribe(() => {
//                 this.hubProxy.invoke("Subscribe", channel)
//                     .done(() => {
//                         console.log(`Successfully subscribed to ${channel} channel`);
//                     })
//                     .fail((error: any) => {
//                         channelSub.subject.error(error);
//                     });
//             },
//             (error: any) => {
//                 channelSub.subject.error(error);
//             });
//
//         return channelSub.subject.asObservable();
//     }
//
//     // Not quite sure how to handle this (if at all) since there could be
//     //  more than 1 caller subscribed to an observable we created
//     //
//     // unsubscribe(channel: string): Rx.Observable<any> {
//     //     this.observables = this.observables.filter((x: ChannelObservable) => {
//     //         return x.channel === channel;
//     //     });
//     // }
//
//     /** publish provides a way for calles to emit events on any channel. In a
//      * production app the server would ensure that only authorized clients can
//      * actually emit the message, but here we're not concerned about that.
//      */
//     publish(ev: ChannelEvent): void {
//         this.hubProxy.invoke("Publish", ev);
//     }
// }
