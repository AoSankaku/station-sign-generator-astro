import type { UUIDTypes } from "uuid";

export interface StationArea {
  id: UUIDTypes; // uuidv7
  name: string;
  isWhite: boolean;
}

export const stationAreas: StationArea[] = [
  { id: "01992fbd-793a-7fd0-9dff-9109cfa6a07a", name: "山", isWhite: true },
  { id: "01992fbd-793a-7c3b-b8a6-28e224d0cd14", name: "区", isWhite: false },
];
