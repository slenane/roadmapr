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

  public getRoadmap(roadmapId: string): Observable<Roadmap> {
    return this.apiService.get(
      this.urlService.generate("ROADMAP_GET", roadmapId)
    );
  }

  public createRoadmapItem(roadmapId: string, data: any): Observable<any> {
    return this.apiService.post(
      this.urlService.generate("ROADMAP_CREATE", roadmapId),
      {
        data,
      }
    );
  }

  public updateRoadmapItem(roadmapId: string, data: any): Observable<any> {
    return this.apiService.patch(
      this.urlService.generate("ROADMAP_UPDATE", roadmapId),
      {
        data,
      }
    );
  }

  public removeRoadmapItem(roadmapId: string, data: any): Observable<any> {
    return this.apiService.post(
      this.urlService.generate("ROADMAP_REMOVE", roadmapId),
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
