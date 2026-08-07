/** Fixed Mon/Thu harvest → Tue/Fri delivery schedule */

const DAY = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
} as const;

function atLocal(base: Date, day: number, hour: number) {
  const d = new Date(base);
  const delta = (day - d.getDay() + 7) % 7;
  d.setDate(d.getDate() + delta);
  d.setHours(hour, 0, 0, 0);
  return d;
}

export function nextHarvestWindow(now = new Date()) {
  // Harvest days Mon(1) and Thu(4) at dawn (6:00)
  const candidates = [DAY.Monday, DAY.Thursday].map((day) => {
    let harvest = atLocal(now, day, 6);
    if (harvest <= now) {
      harvest = new Date(harvest);
      harvest.setDate(harvest.getDate() + 7);
    }
    const cutoff = new Date(harvest);
    // Order by evening before harvest day: Sun 18:00 before Mon, Wed 18:00 before Thu
    cutoff.setDate(harvest.getDate() - 1);
    cutoff.setHours(18, 0, 0, 0);
    const delivery = new Date(harvest);
    delivery.setDate(harvest.getDate() + 1);
    delivery.setHours(10, 0, 0, 0);
    return { harvest, cutoff, delivery };
  });

  candidates.sort((a, b) => a.harvest.getTime() - b.harvest.getTime());
  return candidates[0];
}

export function formatDay(d: Date, locale: "en" | "es") {
  return d.toLocaleDateString(locale === "es" ? "es-CR" : "en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

export function formatTime(d: Date, locale: "en" | "es") {
  return d.toLocaleTimeString(locale === "es" ? "es-CR" : "en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}
