import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/core/services/api.service";
import { UrlService } from "src/app/core/services/url.service";
import { Dashboard } from "../store/dashboard.models";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  constructor(private apiService: ApiService, private urlService: UrlService) {}

  public getDashboard(id: string): Observable<Dashboard> {
    return this.apiService.get(this.urlService.generate("DASHBOARD_GET", id));
  }
}
