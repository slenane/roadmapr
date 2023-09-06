import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/core/services/api.service";
import { UrlService } from "src/app/core/services/url.service";
import { Education } from "../store/education.models";

@Injectable({
  providedIn: "root",
})
export class EducationService {
  constructor(private apiService: ApiService, private urlService: UrlService) {}

  public getEducation(educationId: string): Observable<Education> {
    return this.apiService.get(
      this.urlService.generate("EDUCATION_GET", educationId)
    );
  }

  public createEducationItem(educationId: string, data: any): Observable<any> {
    return this.apiService.post(
      this.urlService.generate("EDUCATION_CREATE", educationId),
      {
        data,
      }
    );
  }

  public updateEducationItem(educationId: string, data: any): Observable<any> {
    return this.apiService.patch(
      this.urlService.generate("EDUCATION_UPDATE", educationId),
      {
        data,
      }
    );
  }

  public bulkUpdateEducationItems(
    educationId: string,
    data: any
  ): Observable<any> {
    return this.apiService.patch(
      this.urlService.generate("EDUCATION_BULK_UPDATE", educationId),
      {
        data,
      }
    );
  }

  public removeEducationItem(educationId: string, data: any): Observable<any> {
    return this.apiService.post(
      this.urlService.generate("EDUCATION_REMOVE", educationId),
      {
        data,
      }
    );
  }

  public getItemDetailsFromLink(link: string): Observable<any> {
    return this.apiService.post(this.urlService.generate("GET_ITEM_DETAILS"), {
      link,
    });
  }
}
