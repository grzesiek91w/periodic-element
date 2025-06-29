import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MockPeriodicElements } from '../mocks/mock-periodic-elements';
import { PeriodicElement } from '../models/periodic-element.model';

@Injectable({
  providedIn: 'root'
})
export class PeriodicResolver implements Resolve<PeriodicElement[] | null> {
  constructor(private periodicsElements: MockPeriodicElements) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PeriodicElement[] | null> {
    return this.periodicsElements.getElements().pipe(
      catchError((error) => {
        console.error('Error', error);
        return of(null); 
      })
    );
  }
}
