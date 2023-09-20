import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ExtUrlResolverService implements Resolve<any> {
  constructor() {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const urlParam = route.queryParamMap.get("url");
    if (urlParam !== null) {
      window.location.href = urlParam;
    }
    return of(null);
  }
}
