import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/core/services/api.service";
import { UrlService } from "src/app/core/services/url.service";
import { Profile } from "../store/profile.models";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  constructor(private apiService: ApiService, private urlService: UrlService) {}

  public getProfile(): Observable<Profile> {
    return this.apiService.get(this.urlService.generate("PROFILE_GET"));
  }

  public updateProfile(id: string, data: any): Observable<Profile> {
    return this.apiService.patch(
      this.urlService.generate("PROFILE_UPDATE", id),
      {
        data,
      }
    );
  }

  public userBasicDetailsProvided(user: any) {
    return (
      user.firstName?.length &&
      user.lastName?.length &&
      user.location?.length &&
      user.nationality?.length &&
      user.path?.length
    );
  }
}
