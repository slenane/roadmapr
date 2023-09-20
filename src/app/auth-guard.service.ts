import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "./auth/services/auth.service";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl("/login");
      return false;
    }
    return true;
  }
}
