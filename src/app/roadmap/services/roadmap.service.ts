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

  public getRoadmap(id: string): Observable<Roadmap> {
    return this.apiService.get(this.urlService.generate("GET_ROADMAP", id));
  }

  public createRoadmapItem(id: string, data: any): Observable<any> {
    return this.apiService.post(
      this.urlService.generate("CREATE_ROADMAP_ITEM"),
      {
        id,
        data,
      }
    );
  }

  public updateRoadmapItem(id: string, data: any): Observable<any> {
    return this.apiService.patch(
      this.urlService.generate("UPDATE_ROADMAP_ITEM", id),
      {
        data,
      }
    );
  }
}
