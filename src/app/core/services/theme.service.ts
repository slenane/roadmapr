import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import {
  DARK_THEME,
  LIGHT_THEME_CLASS,
  LIGHT_THEME,
} from "../constants/theme.constants";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  public theme = new BehaviorSubject<"light" | "dark" | undefined>(DARK_THEME);

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.document.documentElement.classList.contains(LIGHT_THEME_CLASS)
      ? this.theme.next(LIGHT_THEME)
      : this.theme.next(DARK_THEME);
  }

  get selectedTheme() {
    return this.theme.asObservable();
  }

  public updateTheme(theme: string): void {
    if (theme === LIGHT_THEME) {
      this.document.documentElement.classList.add(LIGHT_THEME_CLASS);
      this.theme.next(LIGHT_THEME);
    } else if (theme === DARK_THEME) {
      this.document.documentElement.classList.remove(LIGHT_THEME_CLASS);
      this.theme.next(DARK_THEME);
    }
  }
}
