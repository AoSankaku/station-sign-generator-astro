import { type Station, type StationNameSet } from "./station";
import { type RefObject } from "react";
import type Konva from "konva";

export interface StationWithNeighbor extends Station {
  left: Station[];
  right: Station[];
}

export interface Ekimeihyo extends StationWithNeighbor {
  ratio: number;
  direction?: "right" | "left" | "both";
  ref?: RefObject<Konva.Stage>;
  companyColor?: string;
}