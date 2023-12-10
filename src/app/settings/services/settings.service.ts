import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/core/services/api.service";
import { UrlService } from "src/app/core/services/url.service";
import { Settings } from "../store/settings.models";
import { API } from "src/app/core/constants/http.constants";

@Injectable({
  providedIn: "root",
})
export class SettingsService {
  constructor(private apiService: ApiService, private urlService: UrlService) {}

  public getSettings(): Observable<Settings> {
    return this.apiService.get(this.urlService.generate(API.SETTINGS_GET));
  }

  public updateSettings(
    id: string,
    data: any
  ): Observable<{ settings: Settings; successMessage: string }> {
    return this.apiService.patch(
      this.urlService.generate(API.SETTINGS_UPDATE, id),
      data
    );
  }

  public removeGithub(
    id: string
  ): Observable<{ settings: Settings; successMessage: string }> {
    return this.apiService.patch(
      this.urlService.generate(API.REMOVE_GITHUB, id)
    );
  }

  public updateEmail(
    id: string,
    email: string
  ): Observable<{ successMessage: string; successValue: string }> {
    return this.apiService.patch(
      this.urlService.generate(API.SETTINGS_UPDATE_EMAIL, id),
      email
    );
  }

  public updatePassword(
    id: string,
    password: string
  ): Observable<{ settings: Settings; successMessage: string }> {
    return this.apiService.patch(
      this.urlService.generate(API.SETTINGS_UPDATE_PASSWORD, id),
      { password }
    );
  }

  public updateExistingPassword(
    id: string,
    passwordConfig: { current: string; new: string }
  ): Observable<{ settings: Settings; successMessage: string }> {
    return this.apiService.patch(
      this.urlService.generate(API.SETTINGS_UPDATE_EXISTING_PASSWORD, id),
      passwordConfig
    );
  }

  public deleteAccount(): Observable<{ successMessage: string }> {
    return this.apiService.get(
      this.urlService.generate(API.SETTINGS_DELETE_ACCOUNT)
    );
  }
}
