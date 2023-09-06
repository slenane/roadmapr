import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/core/services/api.service";
import { UrlService } from "src/app/core/services/url.service";
import { Employment } from "../store/employment.models";

@Injectable({
  providedIn: "root",
})
export class EmploymentService {
  constructor(private apiService: ApiService, private urlService: UrlService) {}

  public getEmployment(employmentId: string): Observable<Employment> {
    return this.apiService.get(
      this.urlService.generate("EMPLOYMENT_GET", employmentId)
    );
  }

  public createEmploymentItem(
    employmentId: string,
    data: any
  ): Observable<any> {
    return this.apiService.post(
      this.urlService.generate("EMPLOYMENT_CREATE", employmentId),
      {
        data,
      }
    );
  }

  public updateEmploymentItem(
    employmentId: string,
    data: any
  ): Observable<any> {
    return this.apiService.patch(
      this.urlService.generate("EMPLOYMENT_UPDATE", employmentId),
      {
        data,
      }
    );
  }

  public bulkUpdateEmploymentItems(
    employmentId: string,
    data: any
  ): Observable<any> {
    return this.apiService.patch(
      this.urlService.generate("EMPLOYMENT_BULK_UPDATE", employmentId),
      {
        data,
      }
    );
  }

  public removeEmploymentItem(
    employmentId: string,
    data: any
  ): Observable<any> {
    return this.apiService.post(
      this.urlService.generate("EMPLOYMENT_REMOVE", employmentId),
      {
        data,
      }
    );
  }
}
