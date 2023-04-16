import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/core/services/api.service";
import { UrlService } from "src/app/core/services/url.service";
import { Roadmap } from "../store/roadmap.models";

@Injectable({
  providedIn: "root",
})
export class RoadmapService {
  constructor(private apiService: ApiService, private urlService: UrlService) {}

  public getRoadmap(id: number): Observable<Roadmap> {
    return this.apiService.get(
      this.urlService.generate("GET_ROADMAP", { roadmapId: id })
    );
  }

  public updateRoadmap(id: string, data: any): Observable<any> {
    return this.apiService.post(this.urlService.generate("UPDATE_ROADMAP"), {
      id,
      data,
    });
  }
}
