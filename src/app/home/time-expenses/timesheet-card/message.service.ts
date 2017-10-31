import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Injectable()

/* Generic that can be used to send and receive messages.
Typically to be used with an enum that describes the different cases */
export class MessageService<T> {
    public media: string; // TODO: Remove? What is this used for?

    private messageSource$: BehaviorSubject<T> = new BehaviorSubject({} as T);

    /* Send a message */
    public sendMessage(message: T) {
        this.messageSource$.next(message);
    }

    /* Subscribe to respond to the messages */
    public get messages(): Observable<T> {
        return this.messageSource$.asObservable();
    }
}
