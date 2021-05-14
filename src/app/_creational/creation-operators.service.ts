import {Injectable} from '@angular/core';
import {from, fromEvent, of} from 'rxjs';
import {distinctUntilChanged, filter, map} from 'rxjs/operators'; // pipeable operators

/**
 * The interval() operator will never reach the 'complete' clause of the .subscribe
 * The timer() operators works very similar to interval()
 */
@Injectable({
  providedIn: 'root'
})
export class CreationOperatorsService {

  constructor() {
  }

  pipeableOperator(): void {
    const list = [1, 2, 3, 4, 1];

    console.log('|pipe| map: double the values');
    of(...list)
      .pipe(
        map(value => value * 2)
      )
      .subscribe({
        next: value => {
          console.log(`|next| value: ${value}`);
        },
        error: err => {
          console.log(`|error| err: ${err}`);
        },
        complete: () => {
          console.log('|complete');
        }
      });

    console.log('|pipe| filter: check if the values meet the criteria');
    of(...list)
      .pipe(
        filter(value => value >= 3)
      )
      .subscribe({
        next: value => {
          console.log(`|next| value: ${value}`);
        },
        error: err => {
          console.log(`|error| err: ${err}`);
        },
        complete: () => {
          console.log('|complete');
        }
      });
  }

  /**
   * pipe() receives the input event before the subscription.
   * it intercepts and manipulates data from the observable.
   */
  getInputFromFieldPipeOperator(elementId: string, eventName: string, minLength: number = 5, unsubscribeTimeout: number = 10000): void {
    const subscription = fromEvent(document.getElementById(elementId) as HTMLElement, eventName)
      .pipe(
        map(event => (event.target as HTMLInputElement).value),
        filter(text => text.length > minLength), // only show inputs which have at least 5 characters
        distinctUntilChanged() // emits all items emitted by the source Observable that are distinct by comparison from the previous item
      )
      .subscribe({
        next: (value: string) => {
          console.log(`|fromEvent| ${value}`);
        }
      });

    // unsubscribe
    setTimeout(() => {
      console.log('unsubscribe fromEvent input field');
      subscription.unsubscribe();
    }, unsubscribeTimeout);
  }

  /**
   * create an observable where to emit values in synchronous way
   */
  ofOperator(): void {
    // single value
    console.log('|on| single value');
    of(1)
      .subscribe(value => {
        console.log(value);
      });

    // multiple values
    console.log('|on| multiple values');
    of(10, 20, 30)
      .subscribe(value => {
        console.log(value);
      });

    // array
    console.log('|on| array');
    const list = [100, 200, 300];
    of(list)
      .subscribe(value => {
        console.log(value);
      });

    // array with spread operator
    console.log('|on| array (with spread operator');
    of(...list)
      .subscribe(value => {
        console.log(value);
      });
  }

  /**
   * from operator let you avoid using of with spread operator
   */
  fromOperator(): void {
    // array
    console.log('|from| array ');
    const list = [4, 5, 6];
    from(list)
      .subscribe(value => {
        console.log(value);
      });
  }
}
