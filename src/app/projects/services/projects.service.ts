import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/core/services/api.service";
import { UrlService } from "src/app/core/services/url.service";
import { Projects } from "../store/projects.models";
import { API } from "src/app/core/constants/http.constants";

@Injectable({
  providedIn: "root",
})
export class ProjectsService {
  constructor(private apiService: ApiService, private urlService: UrlService) {}

  public getProjects(projectsId: string): Observable<Projects> {
    return this.apiService.get(
      this.urlService.generate(API.PROJECTS_GET, projectsId)
    );
  }

  public createProject(projectsId: string, data: any): Observable<any> {
    return this.apiService.post(
      this.urlService.generate(API.PROJECTS_CREATE, projectsId),
      {
        data,
      }
    );
  }

  public updateProject(projectsId: string, data: any): Observable<any> {
    return this.apiService.patch(
      this.urlService.generate(API.PROJECTS_UPDATE, projectsId),
      {
        data,
      }
    );
  }

  public bulkUpdateProjectItems(
    projectsId: string,
    data: any
  ): Observable<any> {
    return this.apiService.patch(
      this.urlService.generate(API.PROJECTS_BULK_UPDATE, projectsId),
      {
        data,
      }
    );
  }

  public removeProject(projectsId: string, data: any): Observable<any> {
    return this.apiService.post(
      this.urlService.generate(API.PROJECTS_REMOVE, projectsId),
      {
        data,
      }
    );
  }
}
