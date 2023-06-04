import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/core/services/api.service";
import { UrlService } from "src/app/core/services/url.service";
import { Settings } from "../store/settings.models";

@Injectable({
  providedIn: "root",
})
export class SettingsService {
  constructor(private apiService: ApiService, private urlService: UrlService) {}

  public getSettings(id: string): Observable<Settings> {
    return this.apiService.get(this.urlService.generate("SETTINGS_GET", id));
  }

  public updateSettings(id: string, data: any): Observable<Settings> {
    return this.apiService.patch(
      this.urlService.generate("SETTINGS_UPDATE", id),
      {
        data,
      }
    );
  }
}