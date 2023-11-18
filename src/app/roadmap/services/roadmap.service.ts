import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/core/services/api.service";
import { UrlService } from "src/app/core/services/url.service";
import { Roadmap } from "../store/roadmap.models";
import { API } from "src/app/core/constants/http.constants";
import {
  IDeveloperPath,
  IDeveloperStack,
} from "src/app/shared/constants/dev-paths.constants";

@Injectable({
  providedIn: "root",
})
export class RoadmapService {
  constructor(private apiService: ApiService, private urlService: UrlService) {}

  public getRoadmap(): Observable<Roadmap> {
    return this.apiService.get(this.urlService.generate(API.ROADMAP_GET));
  }

  public updateRoadmap(data: {
    path: IDeveloperPath;
    stack: IDeveloperStack;
  }): Observable<{ roadmap: Roadmap; successMessage: string }> {
    return this.apiService.patch(
      this.urlService.generate(API.ROADMAP_UPDATE),
      data
    );
  }
}
