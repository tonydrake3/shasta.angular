import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Injectable()

export class MessageService<T> {
    public media: string; // TODO: Remove? What is this used for?

    private messageSource$: BehaviorSubject<T> = new BehaviorSubject({} as T);
    sendMessage(message: T) {
        this.messageSource$.next(message);
    }

    public get messages(): Observable<T> {
        return this.messageSource$.asObservable();
    }
}
