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

  public getProfile(id: string): Observable<Profile> {
    return this.apiService.get(this.urlService.generate("GET_PROFILE", id));
  }
}
