export const ORBE_PROPERTY_CODE = "Ksta2";
export const ORBE_BASE =
  "https://reservations.orbebooking.com/Search/SearchAvailability";

export type BookingIntent = "room" | "house" | "ledge" | "enquire";

function formatDate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}${m}${day}`;
}

export function defaultStayDates(nights = 3) {
  const checkIn = new Date();
  checkIn.setDate(checkIn.getDate() + 14);
  const checkOut = new Date(checkIn);
  checkOut.setDate(checkOut.getDate() + nights);
  return { checkIn, checkOut };
}

export function buildOrbeUrl(options?: {
  checkIn?: Date;
  checkOut?: Date;
  adults?: number;
  children?: number;
  locale?: "en" | "es";
}) {
  const defaults = defaultStayDates();
  const checkIn = options?.checkIn ?? defaults.checkIn;
  const checkOut = options?.checkOut ?? defaults.checkOut;
  const adults = options?.adults ?? 2;
  const children = options?.children ?? 0;
  const locale = options?.locale ?? "en";

  return `${ORBE_BASE}/${ORBE_PROPERTY_CODE}/${locale}/${formatDate(checkIn)}/${formatDate(checkOut)}/${adults}/${children}/`;
}

export function toInputDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export function fromInputDate(value: string) {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}
