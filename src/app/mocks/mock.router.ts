import { Subject } from 'rxjs/Subject';
import { NavigationEnd } from '@angular/router';

export class MockRouter {
  public url;
  private subject = new Subject();
  public events = this.subject.asObservable();

  navigate(routes, params) { }

  triggerNavEvents() {
    const ne = new NavigationEnd(0, 'http://localhost:4200/#/login', 'http://localhost:4200/#/login');
    this.subject.next(ne);
  }
}
