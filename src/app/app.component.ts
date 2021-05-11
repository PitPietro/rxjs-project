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

  ngOnInit(): void {
    this.baseObserver();
  }
}
