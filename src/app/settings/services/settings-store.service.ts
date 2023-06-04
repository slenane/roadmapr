import { Injectable } from "@angular/core";
import * as settingsActions from "../store/settings.actions";
import * as settingsSelectors from "../store/settings.selectors";
import { Store } from "@ngrx/store";
import { Settings } from "../store/settings.models";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class SettingsStoreService {
  constructor(private store: Store<Settings>) {}

  getSettings(id: string): Observable<any> {
    this.store.dispatch({
      type: settingsActions.GET_SETTINGS,
      id,
    });

    return this.store
      .select(settingsSelectors.getSettings)
      .pipe(filter((data) => !!data));
  }

  updateSettings(id: string, data: any) {
    this.store.dispatch({
      type: settingsActions.UPDATE_SETTINGS,
      id,
      data,
    });
  }
}
