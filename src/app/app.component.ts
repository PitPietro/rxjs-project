import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rxjs-project';

  baseObserver(): void {
    let counter = 0;
    const obs = new Observable((observer) => {
      observer.next(100); // value emission

      const id = setInterval(() => {
        console.log('inside the interval');
        if (counter < 10) {
          observer.next(Math.random());
        } else {
          observer.complete();
        }
        counter++;
      }, 200);

      return () => {
        clearInterval(id);
      };
    });

    obs.subscribe({
      next: (value) => {
        console.log('next: ', value);
      },
      error: (err) => {
        console.log('error: ', err);
      },
      complete: () => {
        console.log('complete');
      }
    });

    // you can also call the subscribe in this way
    // obs.subscribe(
    //   val => {
    //     console.log('next: ', val);
    //   },
    //   err => {
    //     console.log('error: ', err);
    //   },
    //   () => {
    //     console.log('complete');
    //   }
    // );
  }

  getInputFromField(): void {
    let inputField: HTMLElement | null;
    let buttonField: HTMLElement | null;

    inputField = document.getElementById('my-input');
    buttonField = document.getElementById('btn');

    // basic event listener
    if (inputField !== null) {
      inputField.addEventListener('input', (event) => {
        console.log((event.target as HTMLInputElement).value);
      });
    }

    // make a custom 'fromEvent' function for the input field
    if (inputField !== null) {
      const sub = customFromEvent(inputField, 'input')
        .subscribe({
          next: value => {
            console.log(`|fromEvent| ${(value.target as HTMLInputElement).value}`);
          }
        });

      // unsubscribe
      setTimeout(() => {
        console.log('unsubscribe');
        sub.unsubscribe();
      }, 3000);
    }


    // make a custom 'fromEvent' function for the button
    if (buttonField !== null) {
      const sub = customFromEvent(buttonField, 'click')
        .subscribe({
          next: value => {
            console.log(`|fromEvent| ${(value.target as HTMLInputElement).value}`);
          }
        });

      // unsubscribe
      setTimeout(() => {
        console.log('unsubscribe');
        sub.unsubscribe();
      }, 3000);
    }
  }

  ngOnInit(): void {
    // this.baseObserver();
    this.getInputFromField();
  }
}


function customFromEvent(el: HTMLElement, eventType: string): Observable<any> {
  return new Observable(observer => {
    const fn = (event: Event) => {
      observer.next(event);
    };
    // add the event listener
    el.addEventListener(eventType, fn);
    // remove the event listener
    return () => {
      console.log('|customFromEvent| unsubscribe');
      el.removeEventListener(eventType, fn);
    };
  });
}
