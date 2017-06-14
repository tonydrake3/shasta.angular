import { Component } from '@angular/core';

@Component({
    selector: 'esub-time-expenses',
    styles: [],
    template: `<router-outlet></router-outlet>`
})
export class TimeExpensesComponent {
  constructor() { }
}

@Component({
  template: `<div class="container-fluid">TimeManagementComponent</div>`
})
export class TimeManagementComponent {
  constructor() { }
}

@Component({
  template: `<div class="container-fluid">ExpenseManagementComponent</div>`
})
export class ExpenseManagementComponent {
  constructor() { }
}
