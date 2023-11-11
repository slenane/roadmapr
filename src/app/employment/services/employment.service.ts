import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/core/services/api.service";
import { UrlService } from "src/app/core/services/url.service";
import { Employment } from "../store/employment.models";
import { API } from "src/app/core/constants/http.constants";

@Injectable({
  providedIn: "root",
})
export class EmploymentService {
  constructor(private apiService: ApiService, private urlService: UrlService) {}

  public getEmployment(employmentId: string): Observable<Employment> {
    return this.apiService.get(
      this.urlService.generate(API.EMPLOYMENT_GET, employmentId)
    );
  }

  public createEmploymentItem(
    employmentId: string,
    data: any
  ): Observable<any> {
    return this.apiService.post(
      this.urlService.generate(API.EMPLOYMENT_CREATE, employmentId),
      data
    );
  }

  public updateEmploymentItem(
    employmentId: string,
    data: any
  ): Observable<any> {
    return this.apiService.patch(
      this.urlService.generate(API.EMPLOYMENT_UPDATE, employmentId),
      data
    );
  }

  public bulkUpdateEmploymentItems(
    employmentId: string,
    data: any
  ): Observable<any> {
    return this.apiService.patch(
      this.urlService.generate(API.EMPLOYMENT_BULK_UPDATE, employmentId),
      data
    );
  }

  public removeEmploymentItem(
    employmentId: string,
    data: any
  ): Observable<any> {
    return this.apiService.post(
      this.urlService.generate(API.EMPLOYMENT_REMOVE, employmentId),
      data
    );
  }
}
