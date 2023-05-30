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
      this.urlService.generate("GET_PROJECT", projectsId)
    );
  }

  public createProject(projectsId: string, data: any): Observable<any> {
    console.log(projectsId, data);
    return this.apiService.post(
      this.urlService.generate("CREATE_PROJECT", projectsId),
      {
        data,
      }
    );
  }

  public updateProject(projectsId: string, data: any): Observable<any> {
    return this.apiService.patch(
      this.urlService.generate("UPDATE_PROJECT", projectsId),
      {
        data,
      }
    );
  }

  public removeProject(projectsId: string, data: any): Observable<any> {
    return this.apiService.post(
      this.urlService.generate("REMOVE_PROJECT", projectsId),
      {
        data,
      }
    );
  }
}
