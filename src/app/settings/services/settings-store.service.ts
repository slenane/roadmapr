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

  getSettings(): Observable<any> {
    this.store.dispatch({
      type: settingsActions.GET_SETTINGS,
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

  updateEmail(id: string, email: any) {
    this.store.dispatch({
      type: settingsActions.UPDATE_EMAIL,
      id,
      email,
    });
  }

  updatePassword(id: string, password: any) {
    this.store.dispatch({
      type: settingsActions.UPDATE_PASSWORD,
      id,
      password,
    });
  }

  deleteAccount() {
    this.store.dispatch({
      type: settingsActions.DELETE_ACCOUNT,
    });
  }
}
