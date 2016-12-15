import {Component} from "@angular/core";
import "rxjs/Rx";
import {Observable, Subject} from "rxjs";
import {Store} from "@ngrx/store";
import {HOUR, SECOND} from "./reducers";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  click$ = new Subject<string>().map((value) => {
    return {
      type: HOUR,
      payload: parseInt(value)
    }
  });

  seconds$ = Observable.interval(1000).mapTo( {
      type: SECOND,
      payload: 1
    });

  time;
  people;

  constructor(store: Store<Date>) {
    this.time = store.select('clock');
    this.people = store.select('people')

    Observable.merge(
      this.click$,
      this.seconds$
    ).subscribe(store.dispatch.bind(store))
  }

}
