import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/core/services/api.service";
import { UrlService } from "src/app/core/services/url.service";
import { Projects } from "../store/projects.models";

@Injectable({
  providedIn: "root",
})
export class ProjectsService {
  constructor(private apiService: ApiService, private urlService: UrlService) {}

  public getProjects(projectsId: string): Observable<Projects> {
    return this.apiService.get(
      this.urlService.generate("PROJECTS_GET", projectsId)
    );
  }

  public createProject(projectsId: string, data: any): Observable<any> {
    console.log(projectsId, data);
    return this.apiService.post(
      this.urlService.generate("PROJECTS_CREATE", projectsId),
      {
        data,
      }
    );
  }

  public updateProject(projectsId: string, data: any): Observable<any> {
    return this.apiService.patch(
      this.urlService.generate("PROJECTS_UPDATE", projectsId),
      {
        data,
      }
    );
  }

  public removeProject(projectsId: string, data: any): Observable<any> {
    return this.apiService.post(
      this.urlService.generate("PROJECTS_REMOVE", projectsId),
      {
        data,
      }
    );
  }
}
