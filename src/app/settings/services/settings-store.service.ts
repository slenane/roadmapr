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

  removeGithub(id: string) {
    this.store.dispatch({
      type: settingsActions.REMOVE_GITHUB,
      id,
    });
  }

  updateEmail(id: string, body: any) {
    this.store.dispatch({
      type: settingsActions.UPDATE_EMAIL,
      id,
      body,
    });
  }

  updatePassword(id: string, password: string) {
    this.store.dispatch({
      type: settingsActions.UPDATE_PASSWORD,
      id,
      password,
    });
  }

  updateExistingPassword(
    id: string,
    passwordConfig: { current: string; new: string }
  ) {
    this.store.dispatch({
      type: settingsActions.UPDATE_EXISTING_PASSWORD,
      id,
      passwordConfig,
    });
  }

  deleteAccount() {
    this.store.dispatch({
      type: settingsActions.DELETE_ACCOUNT,
    });
  }
}
