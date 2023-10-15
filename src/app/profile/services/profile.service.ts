import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/core/services/api.service";
import { UrlService } from "src/app/core/services/url.service";
import { Profile } from "../store/profile.models";
import { API } from "src/app/core/constants/http.constants";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  constructor(private apiService: ApiService, private urlService: UrlService) {}

  public getProfile(): Observable<Profile> {
    return this.apiService.get(this.urlService.generate(API.PROFILE_GET));
  }

  public updateProfile(id: string, data: any): Observable<Profile> {
    return this.apiService.patch(
      this.urlService.generate(API.PROFILE_UPDATE, id),
      {
        data,
      }
    );
  }

  public updateProfileImage(formData: FormData): Observable<Profile> {
    return this.apiService.post(
      this.urlService.generate(API.PROFILE_IMAGE_UPDATE),
      formData
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
