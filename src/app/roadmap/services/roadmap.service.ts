import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/core/services/api.service';
import { UrlService } from 'src/app/core/services/url.service';
import { Roadmap } from '../store/roadmap.models';

@Injectable({
  providedIn: 'root'
})
export class RoadmapService {

  constructor(
    // private http: HttpClient,
    private apiService: ApiService,
    private urlService: UrlService,
  ) {}

  public getRoadmap(id: number): Observable <Roadmap> {
    return this.apiService.get(this.urlService.generate('GET_ROADMAP', {roadmapId: id}));
  }
}