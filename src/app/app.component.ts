import { Component, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject, distinctUntilChanged, NEVER, switchMap, timer } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnDestroy, OnInit {
  isRunning$$ = new BehaviorSubject(false);
  count$$ = new BehaviorSubject(0);
  date:any;
  
  constructor() {}

  ngOnInit() {
    this.isRunning$$
      .pipe(
        distinctUntilChanged(),
        switchMap((isRunning) => isRunning ? timer(0, 1000) : NEVER),
      )
      
     .subscribe( this.count$$);
    this.count$$.subscribe(val => this.date = new Date(val*1000));
          
  }

  ngOnDestroy() {
  }

  getMin(ms:any) {
    return ms / 60;
  }

  startCount(): void {
    this.isRunning$$.next(true);
  }

  waitTimer(): void {
    this.isRunning$$.next(false);   
  }

  stopTimer(): void {
    this.count$$.next(0);
    this.isRunning$$.next(false);
  }

  resetTimer(): void {
    this.stopTimer();
    this.startCount();
  }

}