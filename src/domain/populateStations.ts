import type {
  StationEditable,
  StationPopulated,
  StationArea,
  StationNumber,
} from "@/types/station";
import type { Line } from "@/types/lines";

/**
 * Populates readonly fields for stations:
 * - numbers (from line abbreviation + position)
 * - area (resolved from areaIds)
 * - lines (full Line objects)
 */
export function populateStations(
  editableStations: StationEditable[],
  lines: Line[],
  stationAreas: StationArea[]
): StationPopulated[] {
  // Lookup maps
  const areaMap = new Map<string, StationArea>(stationAreas.map(a => [a.id, a]));

  const numbersMap = new Map<string, StationNumber[]>();
  const linesMap = new Map<string, Line[]>();

  // Build reverse lookups from lines
  for (const line of lines) {
    line.stations.forEach((station, index) => {
      // Numbers
      const num: StationNumber = {
        abbreviation: line.abbreviation,
        number: String(index + 1).padStart(2, "0"),
      };
      const nums = numbersMap.get(station.id) ?? [];
      if (!nums.some(n => n.abbreviation === num.abbreviation && n.number === num.number)) {
        nums.push(num);
      }
      numbersMap.set(station.id, nums);

      // Lines (full object)
      const lns = linesMap.get(station.id) ?? [];
      if (!lns.some(l => l.id === line.id)) {
        lns.push(line);
      }
      linesMap.set(station.id, lns);
    });
  }

  // Return populated stations
  return editableStations.map(station => ({
    ...station,
    numbers: Object.freeze(numbersMap.get(station.id) ?? []),
    area: Object.freeze(
      (station.areaIds ?? [])
        .map(id => areaMap.get(id))
        .filter((a): a is StationArea => Boolean(a))
    ),
    lines: Object.freeze(linesMap.get(station.id) ?? []),
  }));
}
