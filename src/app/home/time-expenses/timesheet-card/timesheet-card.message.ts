import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Injectable()

export class MessageService<T> {
    private subject = new Subject<T>();

    public media: string;

    public messageSource$: BehaviorSubject<any> = new BehaviorSubject('');
    sendMessage(message: T) {
        this.subject.next(message);
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<T> {
        return this.subject.asObservable();
    }
}
