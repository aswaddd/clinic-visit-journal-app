import type { VisitRecord } from "./storageUtils";

/** Parse date string to timestamp. Supports ISO, dd/mm/yy, dd-mm-yy, dd.mm.yy, etc. */
export function parseDateToTimestamp(dateStr: string): number {
  const s = String(dateStr || "").trim();
  if (!s) return 0;

  const d = new Date(s);
  if (!Number.isNaN(d.getTime())) return d.getTime();

  // Try dd/mm/yy, dd-mm-yy, dd.mm.yy
  const slashMatch = s.match(/^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{2,4})/);
  if (slashMatch) {
    const [, day, month, year] = slashMatch;
    const y = year.length === 2 ? 2000 + parseInt(year, 10) : parseInt(year, 10);
    const m = parseInt(month, 10) - 1;
    const dd = parseInt(day, 10);
    const parsed = new Date(y, m, dd);
    if (!Number.isNaN(parsed.getTime())) return parsed.getTime();
  }

  // Try yyyy-mm-dd
  const isoMatch = s.match(/^(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})/);
  if (isoMatch) {
    const [, year, month, day] = isoMatch;
    const parsed = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
    if (!Number.isNaN(parsed.getTime())) return parsed.getTime();
  }

  return 0;
}

export type SortField = "date" | "location" | "doctor" | "diagnosis";
export type SortDir = "asc" | "desc";

export function sortVisits(
  visits: VisitRecord[],
  field: SortField,
  dir: SortDir
): VisitRecord[] {
  const arr = [...visits];
  const mult = dir === "asc" ? 1 : -1;

  arr.sort((a, b) => {
    if (field === "date") {
      const ta = parseDateToTimestamp(a.dateTime);
      const tb = parseDateToTimestamp(b.dateTime);
      if (ta !== tb) return mult * (ta - tb);
      return mult * (a.dateTime.localeCompare(b.dateTime));
    }
    const va = (a[field] || "").toLowerCase();
    const vb = (b[field] || "").toLowerCase();
    return mult * va.localeCompare(vb);
  });

  return arr;
}

export function filterVisits(visits: VisitRecord[], query: string): VisitRecord[] {
  const q = query.trim().toLowerCase();
  if (!q) return visits;

  const fields: (keyof VisitRecord)[] = [
    "dateTime",
    "location",
    "doctor",
    "diagnosis",
    "prescription",
    "doctorNote",
    "personalNote",
    "nextVisit",
  ];

  return visits.filter((v) =>
    fields.some((f) => {
      const val = v[f];
      return typeof val === "string" && val.toLowerCase().includes(q);
    })
  );
}
