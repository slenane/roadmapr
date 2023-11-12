import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/core/services/api.service";
import { UrlService } from "src/app/core/services/url.service";
import { Experience } from "../store/experience.models";
import { API } from "src/app/core/constants/http.constants";

@Injectable({
  providedIn: "root",
})
export class ExperienceService {
  constructor(private apiService: ApiService, private urlService: UrlService) {}

  public getExperience(experienceId: string): Observable<Experience> {
    return this.apiService.get(
      this.urlService.generate(API.EXPERIENCE_GET, experienceId)
    );
  }

  public createExperienceItem(
    experienceId: string,
    data: any
  ): Observable<any> {
    return this.apiService.post(
      this.urlService.generate(API.EXPERIENCE_CREATE, experienceId),
      data
    );
  }

  public updateExperienceItem(
    experienceId: string,
    data: any
  ): Observable<any> {
    return this.apiService.patch(
      this.urlService.generate(API.EXPERIENCE_UPDATE, experienceId),
      data
    );
  }

  public bulkUpdateExperienceItems(
    experienceId: string,
    data: any
  ): Observable<any> {
    return this.apiService.patch(
      this.urlService.generate(API.EXPERIENCE_BULK_UPDATE, experienceId),
      data
    );
  }

  public removeExperienceItem(
    experienceId: string,
    data: any
  ): Observable<any> {
    return this.apiService.post(
      this.urlService.generate(API.EXPERIENCE_REMOVE, experienceId),
      data
    );
  }
}
