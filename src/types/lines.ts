import { type Station } from "./station";
import { type UUIDTypes } from "uuid";

export interface LineSummary {
  id: UUIDTypes;
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
}