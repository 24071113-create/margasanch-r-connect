export interface Bus {
  number: number;
  eta: string;
  etaMinutes: number;
  crowd: "Low" | "Medium" | "High";
  route: string[];
  currentPosition: string;
  nextStop: string;
}

export const buses: Bus[] = [
  { number: 12, eta: "3 min", etaMinutes: 3, crowd: "Medium", route: ["Main Bazaar", "Station Rd", "College", "Market"], currentPosition: "Near Station Rd", nextStop: "College" },
  { number: 45, eta: "9 min", etaMinutes: 9, crowd: "Low", route: ["Main Bazaar", "Station Rd", "Market", "Bus Depot"], currentPosition: "Main Bazaar", nextStop: "Station Rd" },
  { number: 22, eta: "17 min", etaMinutes: 17, crowd: "High", route: ["Main Bazaar", "College", "Market"], currentPosition: "Approaching Main Bazaar", nextStop: "Main Bazaar" },
];

export const stops = ["Main Bazaar", "Station Rd", "College", "Market", "Bus Depot", "Mall Circle"];

export function planTrip(from: string, to: string): Bus | null {
  const matching = buses.filter(b => {
    const fromIdx = b.route.indexOf(from);
    const toIdx = b.route.indexOf(to);
    return fromIdx !== -1 && toIdx !== -1 && fromIdx < toIdx;
  });
  if (matching.length === 0) return null;
  return matching.sort((a, b) => a.etaMinutes - b.etaMinutes)[0];
}

export function getBusesAtStop(stop: string): Bus[] {
  return buses.filter(b => b.route.includes(stop));
}

export const smsResponses: Record<string, string> = {
  "102": "Station: Main Bazaar (Stop 102)\nAvailable directions:\n1 → Hingna buses\n2 → Station Rd buses\n3 → Market buses\n\nReply with a number.",
  "1": "🚍 Hingna Buses:\nBus 12 – ETA 3 min (Medium crowd)\nBus 45 – ETA 9 min (Low crowd)",
  "2": "🚍 Station Rd Buses:\nBus 12 – ETA 3 min (Medium crowd)\nBus 45 – ETA 9 min (Low crowd)",
  "3": "🚍 Market Buses:\nBus 12 – ETA 3 min (Medium crowd)\nBus 22 – ETA 17 min (High crowd)",
};
