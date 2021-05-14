import {Injectable} from '@angular/core';
import {from, fromEvent, of} from 'rxjs';
import {distinctUntilChanged, filter, map, reduce, scan} from 'rxjs/operators'; // pipeable operators

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
