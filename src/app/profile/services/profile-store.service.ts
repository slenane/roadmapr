import { Injectable } from "@angular/core";
import * as profileActions from "../store/profile.actions";
import * as profileSelectors from "../store/profile.selectors";
import { Store } from "@ngrx/store";
import { Profile } from "../store/profile.models";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProfileStoreService {
  constructor(private store: Store<Profile>) {}

  getProfile(id: string): Observable<any> {
    this.store.dispatch({
      type: profileActions.GET_PROFILE,
      id,
    });

    return this.store
      .select(profileSelectors.getProfile)
      .pipe(filter((data) => !!data));
  }
}
