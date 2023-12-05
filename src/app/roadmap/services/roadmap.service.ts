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
import { ExperienceItem } from "src/app/experience/store/experience.models";

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

  getStartDate(data: any): number {
    const dates = data
      .filter((item: any) => !!item.startDate)
      .map((item: any) => new Date(item.startDate).getTime());

    return Math.min(...dates);
  }

  getTimeStringSinceDate(date: number): { years: number; days: number } {
    const totalDays = Math.floor(
      (new Date().getTime() - date) / (1000 * 3600 * 24)
    );

    const years = Math.floor(totalDays / 365) || 0;
    const remainingDays = totalDays % 365 || 0;

    return { years: years, days: remainingDays };
  }

  getCombinedTime(timeSet: number[][]): { years: number; days: number } {
    let time = 0;

    for (let set of timeSet) {
      const total = set[1] - set[0];
      time += total;
    }

    const totalDays = Math.floor(time / (1000 * 3600 * 24));
    const years = Math.floor(totalDays / 365) || 0;
    const remainingDays = totalDays % 365 || 0;

    return { years: years, days: remainingDays };
  }

  getPercentageOfTotalTime(
    allItems: any[],
    experienceItems: ExperienceItem[]
  ): number {
    const allStartDate = this.getStartDate(allItems);
    const professionalStartDate = this.getStartDate(experienceItems);

    const totalDays = Math.floor(
      (new Date().getTime() - allStartDate) / (1000 * 3600 * 24)
    );
    const totalProfessionalDays = Math.floor(
      (new Date().getTime() - professionalStartDate) / (1000 * 3600 * 24)
    );

    const percentage = (totalProfessionalDays / totalDays) * 100;

    return Math.floor(percentage);
  }
}
