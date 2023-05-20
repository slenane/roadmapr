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
      this.urlService.generate("GET_ROADMAP", roadmapId)
    );
  }

  public createRoadmapItem(roadmapId: string, data: any): Observable<any> {
    console.log(roadmapId, data);
    return this.apiService.post(
      this.urlService.generate("CREATE_ROADMAP_ITEM", roadmapId),
      {
        data,
      }
    );
  }

  public updateRoadmapItem(roadmapId: string, data: any): Observable<any> {
    return this.apiService.patch(
      this.urlService.generate("UPDATE_ROADMAP_ITEM", roadmapId),
      {
        data,
      }
    );
  }

  public removeRoadmapItem(roadmapId: string, itemId: string): Observable<any> {
    return this.apiService.patch(
      this.urlService.generate("UPDATE_ROADMAP_ITEM", roadmapId),
      {
        itemId,
      }
    );
  }

  // public getAmazonProducts() {
  //   return this.apiService.get(
  //     "https://www.amazon.es/Eloquent-JavaScript-Modern-Introduction-Programming/dp/1593279507"
  //   );
  // }
}
