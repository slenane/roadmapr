import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/core/services/api.service";
import { UrlService } from "src/app/core/services/url.service";
import { Recommendation } from "../store/recommendations.models";
import { API } from "src/app/core/constants/http.constants";

@Injectable({
  providedIn: "root",
})
export class RecommendationsService {
  constructor(private apiService: ApiService, private urlService: UrlService) {}

  public getRecommendations(): Observable<Recommendation[]> {
    return this.apiService.get(
      this.urlService.generate(API.RECOMMENDATIONS_GET)
    );
  }
}
