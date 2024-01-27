import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const preAuthRoute = next?.data?.preAuthRoute;

    if (this.authService.isLoggedIn()) {
      if (preAuthRoute) return this.router.createUrlTree(["/roadmap"]);
      return true;
    } else {
      if (preAuthRoute) return true;
      return this.router.createUrlTree(["/login"]);
    }
  }
}
