import type { UUIDTypes } from "uuid";
import type { Line } from "./lines";

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
  memo?: string;
}

export interface StationNumber {
  abbreviation: string;
  number: string;
}

export interface Station {
  names: StationNameSet;
  threeLetterCode?: string;
  areaIds?: string[];
  memo?: string;
  id: UUIDTypes; // uuidv7

  // Populated properties (not editable)
  numbers?: readonly StationNumber[]; // Station Number (e.g. "JY", "28")
  area?: readonly StationArea[];
  lines?: readonly Line[];
}

export type StationEditable = Omit<Station, "numbers" | "area" | "lines">;
export type StationPopulated = Station;
