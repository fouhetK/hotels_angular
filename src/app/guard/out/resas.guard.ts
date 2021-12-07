import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ResasDetailsComponent } from 'src/app/resas/resas-details/resas-details.component';

@Injectable({
  providedIn: 'root'
})
export class ResasGuard implements CanDeactivate<ResasDetailsComponent> {
  canDeactivate(
    component: ResasDetailsComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (component.resaForm.get('datedeb')?.value != "" || component.resaForm.get('datefin')?.value != ""
      || component.resaForm.get('numChambre')?.value != "" || component.resaForm.get('client')?.value != null
      || component.resaForm.get('hotel')?.value != null)
      return confirm("Êtes vous sur de vouloir quiter la page ?")
    return true;
  }

}
