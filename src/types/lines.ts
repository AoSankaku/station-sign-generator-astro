import { type Station } from "./station";

export interface LineSummary {
  id: string;
  formalName: {
    japanese?: string;
    japaneseFurigana?: string;
    english?: string;
    chinese?: string;
    korean?: string;
  };
  abbreviation: string;
}

export interface Line extends LineSummary {
  memo?: string;
  stations: readonly Station[];
  color: string;
}