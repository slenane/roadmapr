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

  public getSettings(): Observable<Settings> {
    return this.apiService.get(this.urlService.generate("SETTINGS_GET"));
  }

  public updateSettings(id: string, data: any): Observable<Settings> {
    return this.apiService.patch(
      this.urlService.generate("SETTINGS_UPDATE", id),
      {
        data,
      }
    );
  }

  public updatePassword(id: string, password: any): Observable<Settings> {
    return this.apiService.patch(
      this.urlService.generate("SETTINGS_UPDATE_PASSWORD", id),
      { password }
    );
  }

  public deleteAccount(): Observable<Settings> {
    return this.apiService.get(
      this.urlService.generate("SETTINGS_DELETE_ACCOUNT")
    );
  }
}
