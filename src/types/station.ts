import type { UUIDTypes } from "uuid";
import type { LineSummary } from "./lines";

export interface StationNameSet {
  name: {
    japanese?: string;
    japaneseFurigana?: string;
    english?: string;
    chinese?: string;
    korean?: string;
  }
  note?: string;
}

export interface StationArea {
  id: UUIDTypes; // uuidv7
  name: string;
  isWhite: boolean;
}

export interface Station {
  names: StationNameSet;
  numbers?: string[];
  threeLetterCode?: string;
  area?: StationArea[];
  memo?: string;
  id: UUIDTypes; // uuidv7
  lines?: LineSummary[];
}