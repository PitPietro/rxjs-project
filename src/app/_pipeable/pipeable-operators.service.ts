import {Injectable} from '@angular/core';
import {fromEvent, interval, of} from 'rxjs';
import {
  distinct,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  first,
  last,
  map,
  reduce,
  scan,
  take,
  takeWhile
} from 'rxjs/operators';

interface BaseInterface {
  id: number;
}

interface Cart extends BaseInterface {
  cost: number;
}

interface User extends BaseInterface {
  isAdmin: boolean;
}

interface Pet extends BaseInterface {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class PipeableOperatorsService {

  constructor() {
  }

  pipeableOperators(): void {
    const list = [1, 2, 3, 4, 5, 1, 1, 2, 7, 7];

    // this.mapOperator(list);
    // this.filterOperator(list);
    // this.reduceOperator(list);
    // this.scanOperator(list);

    // this.distinctOperator(list);
    // this.distinctUntilChangedOperator(list);
    // this.distinctUntilKeyChangedOperator();

    // this.takeOperator(list);
    // this.takeWhileOperator(list);

    this.firstOperator(list);
    this.lastOperator(list);
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
   *
   * @param list list of numbers on which the map() function will be performed
   * @private
   */
  private mapOperator(list: number[]): void {
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
  }

  /**
   * reduce() is an accumulation pipeable operator.
   * Applies an accumulator function over the source Observable, and returns the
   * accumulated result when the source completes, given an optional seed value.
   *
   * The parameters are:
   * <ol>
   *   <li>
   *     <code>function(acc: R, value: T, index: number): R</code> ~ The accumulator function called on each source value.
   *   </li>
   *   <li>
   *     <code>seed</code> ~ The initial accumulation value.
   *   </li>
   * </ol>
   * The return value is:
   * <ul>
   *   <li>
   *     <code>Observable<R></code> ~ An Observable that emits a single value that is the result of accumulating the values
   *     emitted by the source Observable.
   *   </li>
   * </ul>
   *
   * @param list number list on which perform the reduce() function
   * @private
   */
  private reduceOperator(list: number[]): void {
    console.log('|pipe| reduce');
    of(...list)
      .pipe(
        reduce((acc, value) => value + acc, 0)
      )
      .subscribe({
        next: value => {
          console.log(`|next| value: ${value}`);
        },
        error: err => {
          console.log(`|error| err: ${err}`);
        },
        complete: () => {
          console.log('|complete|');
        }
      });

    // with a array of objects
    const cart: Cart[] = [
      {id: 1, cost: 10},
      {id: 2, cost: 20},
      {id: 3, cost: 30},
      {id: 4, cost: 80},
      {id: 5, cost: 70},
      {id: 6, cost: 50},
      {id: 7, cost: 60},
      {id: 8, cost: 40},
    ];

    console.log('|pipe| reduce with objects');
    of(...cart)
      .pipe(
        reduce((acc, value) => value.cost + acc, 0)
      )
      .subscribe({
        next: value => {
          console.log(`|next| value: ${value}`);
        },
        error: err => {
          console.log(`|error| err: ${err}`);
        },
        complete: () => {
          console.log('|complete|');
        }
      });
  }

  /**
   * scan() behave in the same way of reduce(), but it emits the intermediate values while accumulating the result
   * Applies an accumulator function over the source Observable, and returns each intermediate result, with an optional seed value.
   *
   * The parameters are:
   * <ol>
   *   <li>
   *     <code>function(acc: R, value: T, index: number): R</code> ~ The accumulator function called on each source value.
   *   </li>
   *   <li>
   *     <code>seed</code> ~ The initial accumulation value.
   *   </li>
   * </ol>
   *
   * The return value is:<br/>
   * <code>Observable<R></code> ~ An Observable that emits a single value that is the result of accumulating the values emitted
   * by the source Observable.
   * @param list list of numbers on which the reduce() function will be performed
   * @private
   */
  private scanOperator(list: number[]): void {
    console.log('|pipe| scan');
    of(...list)
      .pipe(
        scan((acc, value) => value + acc, 0)
      )
      .subscribe({
        next: value => {
          console.log(`|next| value: ${value}`);
        },
        error: err => {
          console.log(`|error| err: ${err}`);
        },
        complete: () => {
          console.log('|complete|');
        }
      });

    // with a array of objects
    const cart: Cart[] = [
      {id: 1, cost: 10},
      {id: 2, cost: 20},
      {id: 3, cost: 30},
      {id: 4, cost: 80},
      {id: 5, cost: 70},
      {id: 6, cost: 50},
      {id: 7, cost: 60},
      {id: 8, cost: 40},
    ];

    console.log('|pipe| scan with objects');
    of(...cart)
      .pipe(
        scan((acc, value) => value.cost + acc, 0)
      )
      .subscribe({
        next: value => {
          console.log(`|next| value: ${value}`);
        },
        error: err => {
          console.log(`|error| err: ${err}`);
        },
        complete: () => {
          console.log('|complete|');
        }
      });
  }

  /**
   * Filter items emitted by the source Observable by only emitting those that satisfy a specified predicate.
   *
   * The parameters are:
   * <ol>
   *   <li>
   *     <code>function(value: T, index: number): boolean</code> ~ The <code>predicate</code> is a function that evaluates each value
   *     emitted by the source Observable. If it returns <code>true</code>, the value is emitted, if <code>false</code> the value is not
   *     passed to the output Observable. The <code>index</code> parameter is the number <code>i</code> for the <code>i</code>-th source
   *     emission that has happened since the subscription, starting from the number <code>0</code>.
   *   </li>
   *   <li>
   *     <code>any</code> ~ An optional argument to determine the value of <code>this</code> in the <code>predicate</code> function.
   *   </li>
   * </ol>
   *
   * The return value is:
   * <ul>
   *   <li>
   *     <code>Observable</code> ~ An Observable of values from the source that were allowed by the <code>predicate</code> function.
   *   </li>
   * </ul>
   *
   * @param list list of numbers on which the filter() function will be performed
   * @private
   */
  private filterOperator(list: number[]): void {
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
          console.log('|complete|');
        }
      });

    const users: User[] = [
      {id: 1, isAdmin: false},
      {id: 2, isAdmin: true},
      {id: 3, isAdmin: true},
      {id: 4, isAdmin: true},
      {id: 5, isAdmin: false},
      {id: 6, isAdmin: false},
      {id: 7, isAdmin: true},
      {id: 8, isAdmin: false},
    ];
    console.log('|pipe| filter: check if the values meet the criteria (values are objects)');
    of(...users)
      .pipe(
        filter(user => user.isAdmin)
      )
      .subscribe({
        next: value => {
          console.log(`|next| value: ${JSON.stringify(value, null, 2)}`);
        },
        error: err => {
          console.log(`|error| err: ${err}`);
        },
        complete: () => {
          console.log('|complete|');
        }
      });
  }

  /**
   * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from previous items.
   *
   * The parameters are:
   * <ol>
   *   <li>
   *     <code>function</code> ~ The <code>keySelector</code> is an optional function that select which value you want to check as distinct.
   *   </li>
   *   <li>
   *     <code>Observable</code> ~ The <code>flushes</code> is an optional parameter. It flushes the internal HashSet of the operator.
   *   </li>
   * </ol>
   *
   * The return value is:
   * <ul>
   *   <li>
   *     <code>Observable</code> ~ An Observable that emits items from the source Observable with distinct values.
   *   </li>
   * </ul>
   *
   * <b>Please Note</b> This operator does not work with list of objects unless you specify the parameter that must be taken as unique.
   * @param list list of numbers on which the filter() function will be performed
   * @method distinct
   * @private
   */
  private distinctOperator(list: number[]): void {
    console.log('|pipe| distinct: avoid duplicates');
    of(...list)
      .pipe(
        distinct()
      )
      .subscribe({
        next: value => {
          console.log(`|next| value: ${value}`);
        },
        error: err => {
          console.log(`|error| err: ${err}`);
        },
        complete: () => {
          console.log('|complete|');
        }
      });

    // with a array of objects
    const pets: Pet[] = [
      {id: 1, name: 'Pat'},
      {id: 1, name: 'Pit'},
      {id: 1, name: 'Pot'},
      {id: 2, name: 'Bin'},
      {id: 2, name: 'Gin'},
      {id: 3, name: 'Wil'},
      {id: 3, name: 'Cat'},
      {id: 3, name: 'Cit'},
      {id: 3, name: 'Cot'},
    ];

    console.log('|pipe| distinct with objects');
    of(...pets)
      .pipe(
        distinct((value: Pet) => value.id)
      )
      .subscribe({
        next: value => {
          console.log(`|next| value: ${JSON.stringify(value, null, 2)}`);
        },
        error: err => {
          console.log(`|error| err: ${err}`);
        },
        complete: () => {
          console.log('|complete|');
        }
      });
  }

  /**
   * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item.
   *
   * The parameters are:
   * <ol>
   *   <li>
   *     <code>function</code> ~ The <code>keySelector</code> is an optional function that select which value you want to check as distinct.
   *   </li>
   *   <li>
   *     <code>Observable</code> ~ The <code>flushes</code> is an optional parameter. It flushes the internal HashSet of the operator.
   *   </li>
   * </ol>
   *
   * The return value is:
   * <ul>
   *   <li>
   *     <code>Observable</code> ~ An Observable that emits items from the source Observable with distinct values.
   *   </li>
   * </ul>
   *
   * <b>Please Note</b> This operator does not work with list of objects unless you specify the parameter that must be taken as unique.
   *
   * @see {@link distinct}
   * @see {@link distinctUntilKeyChanged}
   *
   * @param list list of numbers on which the filter() function will be performed
   * @method distinctUntilChanged
   * @private
   */
  private distinctUntilChangedOperator(list: number[]): void {
    console.log('|pipe| distinctUntilChanged: avoid duplicates with the previous element');
    of(...list)
      .pipe(
        distinctUntilChanged()
      )
      .subscribe({
        next: value => {
          console.log(`|next| value: ${value}`);
        },
        error: err => {
          console.log(`|error| err: ${err}`);
        },
        complete: () => {
          console.log('|complete|');
        }
      });
  }

  /**
   * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the
   * previous item, using a property accessed by using the key provided to check if the two items are distinct.
   *
   * The parameters are:
   * <ol>
   *   <li>
   *     <code>string</code> ~ The <code>key</code> is an optional <code>string</code> parameter for object property lookup on each item.
   *   </li>
   *   <li>
   *     <code>function</code> ~ The <code>compare</code> optional function is called to test if an item is distinct from the
   *     previous item in the source.
   *   </li>
   * </ol>
   *
   * The return value is:
   * <ul>
   *   <li>
   *     <code>Observable</code> ~ An Observable that emits items from the source with distinct values based on the key specified.
   *   </li>
   * </ul>
   *
   * <b>Please Note</b> This operator does not work with list of objects unless you specify the parameter that must be taken as unique.
   *
   * @see {@link distinct}
   * @see {@link distinctUntilChanged}
   *
   * @method distinctUntilKeyChanged
   * @private
   */
  private distinctUntilKeyChangedOperator(): void {

    // with a array of objects
    const pets: Pet[] = [
      {id: 1, name: 'Pit'},
      {id: 1, name: 'Pat'},
      {id: 2, name: 'Jil'},
      {id: 2, name: 'Bil'},
      {id: 3, name: 'Man'},
      {id: 3, name: 'Min'},
    ];

    console.log('|pipe| distinctUntilKeyChanged with objects');
    of(...pets) // from(pets)
      .pipe(
        distinctUntilKeyChanged('id')
      )
      .subscribe({
        next: value => {
          console.log(`|next| value: ${JSON.stringify(value, null, 2)}`);
        },
        error: err => {
          console.log(`|error| err: ${err}`);
        },
        complete: () => {
          console.log('|complete|');
        }
      });
  }

  /**
   * Emits only the first `count` values emitted by the source Observable.
   *
   * The parameters are:
   * 1. `ArgumentOutOfRangeError` ~ The maximum number of `next` values to emit.
   *
   * The return value is:
   * - `Observable<T>` ~ An Observable that emits only the first `count` values emitted by the source Observable, or all of the
   * values from the source if the source emits fewer than `count` values.
   *
   * @param list list of numbers on which the filter() function will be performed
   * @param num number of element to take
   * @private
   */
  private takeOperator(list: number[], num: number = 3): void {
    console.log('|pipe| take');
    of(...list)
      .pipe(
        take(num)
      )
      .subscribe({
        next: value => {
          console.log(`|next| value: ${value}`);
        },
        error: err => {
          console.log(`|error| err: ${err}`);
        },
        complete: () => {
          console.log('|complete|');
        }
      });
  }

  /**
   * Emits values emitted by the source Observable so long as each value satisfies the given `predicate`, and then completes
   * as soon as this `predicate` is not satisfied.
   *
   * The parameters are:
   * 1. `unction(value: T, index: number): boolean` ~ The `predicate` is a function that evaluates a value emitted by the
   * source Observable and returns a boolean. Also takes the (zero-based) index as the second argument.
   * 2. `boolean` ~ When set to `true`, emit the value that caused `predicate` to return `false`.
   *
   * The return value is:
   * - `Observable<T>` ~ An Observable that emits the values from the source Observable so long as each value satisfies
   * the condition defined by the `predicate`, then completes.
   *
   * @param list list of numbers on which the filter() function will be performed
   * @private
   */
  private takeWhileOperator(list: number[]): void {
    console.log('|pipe| takeWhile');
    of(...list)
      .pipe(
        takeWhile(value => value < 5, false)
      )
      .subscribe({
        next: value => {
          console.log(`|next| value: ${value}`);
        },
        error: err => {
          console.log(`|error| err: ${err}`);
        },
        complete: () => {
          console.log('|complete|');
        }
      });

    // stop interval() operator
    console.log('|pipe| takeWhile inside interval()');
    interval(500)
      .pipe(
        takeWhile(value => value < 10, true)
        // reduce(...)
      )
      .subscribe({
        next: value => {
          console.log(`|next| value: ${value}`);
        },
        error: err => {
          console.log(`|error| err: ${err}`);
        },
        complete: () => {
          console.log('|complete|');
        }
      });
  }

  /**
   * Emits only the first value (or the first value that meets some condition) emitted by the source Observable.
   *
   * The parameters are:
   * 1. `function(value: T, index: number, source: Observable<T>` ~ Optional function called with each item to test for condition matching.
   * 2. `R` ~ An optional default value to provide if last predicate isn't met or no values were emitted.
   *
   * The return value is:
   * - `Observable` ~ n Observable that emits only the last item satisfying the given condition from the source, or
   * an `NoSuchElementException` if no such items are emitted.
   *
   * @param list list of numbers on which the filter() function will be performed
   * @private
   */
  private firstOperator(list: number[]): void {
    console.log('|pipe| first');
    of(...list)
      .pipe(
        first()
      )
      .subscribe({
        next: value => {
          console.log(`|next| value: ${value}`);
        },
        error: err => {
          console.log(`|error| err: ${err}`);
        },
        complete: () => {
          console.log('|complete|');
        }
      });

    // add a condition
    console.log('|pipe| first with condition');
    of(...list)
      .pipe(
        first(value => value > 4)
      )
      .subscribe({
        next: value => {
          console.log(`|next| value: ${value}`);
        },
        error: err => {
          console.log(`|error| err: ${err}`);
        },
        complete: () => {
          console.log('|complete|');
        }
      });
  }

  /**
   * Returns an Observable that emits only the last item emitted by the source Observable.
   *
   * The parameters are:
   * 1. `function` ~ The condition any source emitted item has to satisfy.
   * 2. `R` ~ The default value emitted in case no valid value was found on the source.
   *
   * The return value is:
   * - `Observable<T|R>` ~ An Observable of the first item that matches the condition
   * @param list
   * @private
   */
  private lastOperator(list: number[]): void {
    console.log('|pipe| last');
    of(...list)
      .pipe(
        last()
      )
      .subscribe({
        next: value => {
          console.log(`|next| value: ${value}`);
        },
        error: err => {
          console.log(`|error| err: ${err}`);
        },
        complete: () => {
          console.log('|complete|');
        }
      });

    // add a condition
    console.log('|pipe| last with condition');
    of(...list)
      .pipe(
        last(value => value > 4)
      )
      .subscribe({
        next: value => {
          console.log(`|next| value: ${value}`);
        },
        error: err => {
          console.log(`|error| err: ${err}`);
        },
        complete: () => {
          console.log('|complete|');
        }
      });
  }
}
