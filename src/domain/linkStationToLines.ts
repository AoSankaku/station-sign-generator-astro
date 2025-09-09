import type { Line, LineSummary } from "@/types/lines";
import type { Station } from "@/types/station";

/**
 * Populates the `lines` property of each station based on the given lines array.
 * Mutates the station objects in place.
 */
export function linkStationsToLines(lines: readonly Line[]): void {
  for (const line of lines) {
    const summary: LineSummary = {
      id: line.id,
      formalName: line.formalName,
      abbreviation: line.abbreviation,
    };

    for (const station of line.stations) {
      if (!station.lines) {
        station.lines = [];
      }

      // Avoid duplicates if the same station appears multiple times
      if (!station.lines.some(l => l.id === summary.id)) {
        station.lines.push(summary);
      }
    }
  }
}
