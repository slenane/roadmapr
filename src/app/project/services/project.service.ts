import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/core/services/api.service";
import { UrlService } from "src/app/core/services/url.service";
import { Projects } from "../store/project.models";

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  constructor(private apiService: ApiService, private urlService: UrlService) {}

  public getProjects(projectId: string): Observable<Projects> {
    return this.apiService.get(
      this.urlService.generate("GET_PROJECT", projectId)
    );
  }

  public createProject(projectId: string, data: any): Observable<any> {
    return this.apiService.post(
      this.urlService.generate("CREATE_PROJECT", projectId),
      {
        data,
      }
    );
  }

  public updateProject(projectId: string, data: any): Observable<any> {
    return this.apiService.patch(
      this.urlService.generate("UPDATE_PROJECT", projectId),
      {
        data,
      }
    );
  }

  public removeProject(projectId: string, data: any): Observable<any> {
    return this.apiService.post(
      this.urlService.generate("REMOVE_PROJECT", projectId),
      {
        data,
      }
    );
  }
}
