import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Injectable()

export class MessageService {
    private subject = new Subject<any>();

    public media: string;

    public messageSource$: BehaviorSubject<any> = new BehaviorSubject('');
    sendMessage(message: any) {
        this.subject.next({text: message});
    }
    clearMessage() {
        this.subject.next();
    }
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
