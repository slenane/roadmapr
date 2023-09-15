import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import {
  DARK_THEME,
  DARK_THEME_CLASS,
  LIGHT_THEME,
} from "../constants/theme.constants";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  public theme = new BehaviorSubject<string>("light");

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.document.documentElement.classList.contains(DARK_THEME_CLASS)
      ? this.theme.next(DARK_THEME)
      : this.theme.next(LIGHT_THEME);
  }

  get selectedTheme() {
    return this.theme.asObservable();
  }

  public updateTheme(theme: string): void {
    if (theme === DARK_THEME) {
      this.document.documentElement.classList.add(DARK_THEME_CLASS);
      this.theme.next(DARK_THEME);
    } else if (theme === LIGHT_THEME) {
      this.document.documentElement.classList.remove(DARK_THEME_CLASS);
      this.theme.next(LIGHT_THEME);
    }
  }
}
