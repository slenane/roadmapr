import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import {
  DARK_THEME,
  DARK_THEME_CLASS,
  LIGHT_THEME,
} from "../constants/theme.constants";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  public theme: string;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.theme = this.document.documentElement.classList.contains(
      DARK_THEME_CLASS
    )
      ? DARK_THEME
      : LIGHT_THEME;
  }

  public updateTheme(theme: string): void {
    if (theme === DARK_THEME) {
      this.document.documentElement.classList.add(DARK_THEME_CLASS);
      this.theme = DARK_THEME;
    } else if (theme === LIGHT_THEME) {
      this.document.documentElement.classList.remove(DARK_THEME_CLASS);
      this.theme = LIGHT_THEME;
    }
  }
}
