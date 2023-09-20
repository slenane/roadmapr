import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "src/app/auth/services/auth.interceptor";

export const HttpInterceptProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
];
