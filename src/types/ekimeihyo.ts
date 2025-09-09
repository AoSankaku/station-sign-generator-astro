import { type Station, type StationNameSet } from "./station";

export interface StationWithNeighbor extends Station {
  left: StationNameSet | StationNameSet[];
  right: StationNameSet | StationNameSet[];
}

export interface Ekimeihyo extends StationWithNeighbor {
  ratio: number;
  direction: "right" | "left" | "both"
}