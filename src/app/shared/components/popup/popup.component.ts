import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, timer} from "rxjs";
import {Router} from "@angular/router";
import { takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit, OnDestroy {

  showPopup = false;
  private destroy$ = new Subject<void>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Показать попап через 10 секунд, если пользователь не ушел с главной страницы
    timer(10000).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.showPopup = true;
    });
  }

  redirectToCatalog(): void {
    this.router.navigate(['/collections']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
