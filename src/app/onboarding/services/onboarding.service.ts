import { Injectable } from "@angular/core";
import {
  QUESTION_NUMBERS,
  QUESTION_OPTIONS,
  RECOMMENDED_PATHS,
} from "../constants/developer-path.constants";

@Injectable({
  providedIn: "root",
})
export class OnboardingService {
  constructor() {}

  getRecommendedPath(results: any) {
    let recommendations = {
      frontend: 0,
      backend: 0,
      fullStack: 0,
      mobile: 0,
      game: 0,
    };

    recommendations = this.calculateAnswerZero(recommendations, results);
    recommendations = this.calculateAnswerOne(recommendations, results);
    recommendations = this.calculateAnswerTwo(recommendations, results);
    recommendations = this.calculateAnswerThree(recommendations, results);
    recommendations = this.calculateAnswerFour(recommendations, results);

    const recommendation = this.getHighestValue(recommendations);

    return RECOMMENDED_PATHS[recommendation];
  }

  calculateAnswerZero(recommendations: any, results: any) {
    if (results[QUESTION_NUMBERS.ZERO] === QUESTION_OPTIONS.A) {
      recommendations.frontend += 3;
    } else if (results[QUESTION_NUMBERS.ZERO] === QUESTION_OPTIONS.B) {
      recommendations.backend += 3;
    } else if (results[QUESTION_NUMBERS.ZERO] === QUESTION_OPTIONS.C) {
      recommendations.mobile += 3;
    } else if (results[QUESTION_NUMBERS.ZERO] === QUESTION_OPTIONS.D) {
      recommendations.game += 3;
    } else {
      recommendations.fullStack += 1;
    }

    return recommendations;
  }
  calculateAnswerOne(recommendations: any, results: any) {
    if (results[QUESTION_NUMBERS.ONE] === QUESTION_OPTIONS.A) {
      recommendations.frontend += 3;
      recommendations.backend += 1;
    } else if (results[QUESTION_NUMBERS.ONE] === QUESTION_OPTIONS.B) {
      recommendations.backend += 3;
      recommendations.mobile += 1;
    } else if (results[QUESTION_NUMBERS.ONE] === QUESTION_OPTIONS.C) {
      recommendations.game += 3;
      recommendations.mobile += 1;
    } else if (results[QUESTION_NUMBERS.ONE] === QUESTION_OPTIONS.D) {
      recommendations.mobile += 3;
      recommendations.game += 1;
    } else {
      recommendations.fullStack += 1;
    }

    return recommendations;
  }
  calculateAnswerTwo(recommendations: any, results: any) {
    if (results[QUESTION_NUMBERS.TWO] === QUESTION_OPTIONS.A) {
      recommendations.frontend += 3;
      recommendations.mobile += 1;
    } else if (results[QUESTION_NUMBERS.TWO] === QUESTION_OPTIONS.B) {
      recommendations.backend += 3;
    } else if (results[QUESTION_NUMBERS.TWO] === QUESTION_OPTIONS.C) {
      recommendations.mobile += 3;
      recommendations.frontend += 1;
      recommendations.game += 1;
    } else if (results[QUESTION_NUMBERS.TWO] === QUESTION_OPTIONS.D) {
      recommendations.fullStack += 3;
      recommendations.mobile += 2;
    } else {
      recommendations.fullStack += 1;
    }

    return recommendations;
  }
  calculateAnswerThree(recommendations: any, results: any) {
    if (results[QUESTION_NUMBERS.THREE] === QUESTION_OPTIONS.A) {
      recommendations.frontend += 3;
    } else if (results[QUESTION_NUMBERS.THREE] === QUESTION_OPTIONS.B) {
      recommendations.backend += 3;
    } else if (results[QUESTION_NUMBERS.THREE] === QUESTION_OPTIONS.C) {
      recommendations.mobile += 3;
      recommendations.game += 2;
    } else if (results[QUESTION_NUMBERS.THREE] === QUESTION_OPTIONS.D) {
      recommendations.fullStack += 3;
      recommendations.game += 2;
    } else {
      recommendations.fullStack += 1;
    }

    return recommendations;
  }
  calculateAnswerFour(recommendations: any, results: any) {
    if (results[QUESTION_NUMBERS.FOUR] === QUESTION_OPTIONS.A) {
      recommendations.frontend += 3;
    } else if (results[QUESTION_NUMBERS.FOUR] === QUESTION_OPTIONS.B) {
      recommendations.backend += 3;
    } else if (results[QUESTION_NUMBERS.FOUR] === QUESTION_OPTIONS.C) {
      recommendations.mobile += 3;
      recommendations.game += 3;
    } else if (results[QUESTION_NUMBERS.FOUR] === QUESTION_OPTIONS.D) {
      recommendations.fullStack += 3;
      recommendations.mobile += 1;
    } else {
      recommendations.fullStack += 1;
    }

    return recommendations;
  }

  getHighestValue(
    results: any
  ): "frontend" | "backend" | "fullStack" | "game" | "mobile" {
    let highestValue = 0;
    let highestKey: any;

    for (const key in results) {
      if (results[key] > highestValue) {
        highestValue = results[key];
        highestKey = key;
      }
    }

    return highestKey;
  }
}
