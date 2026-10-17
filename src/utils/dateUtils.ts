/**
 * Date utility functions for the Date Invitation application.
 * Uses Asia/Karachi timezone as authoritative for all calculations.
 */

export interface DynamicDateOption {
  id: string;
  weekdayShort: string;
  day: string;
  monthShort: string;
  weekdayFull: string;
  monthFull: string;
  year: number;
  fullLabel: string;
  dateKey: string; // YYYY-MM-DD
}

/**
 * Gets the current date parts in Asia/Karachi time zone.
 * Falls back safely to local time if timezone format is unsupported.
 */
export function getKarachiDateParts(date: Date = new Date()): { year: number; month: number; day: number; dayOfWeek: number } {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Karachi',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      weekday: 'short',
    });
    
    const parts = formatter.formatToParts(date);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let weekdayStr = '';

    for (const part of parts) {
      if (part.type === 'year') year = parseInt(part.value, 10);
      if (part.type === 'month') month = parseInt(part.value, 10);
      if (part.type === 'day') day = parseInt(part.value, 10);
      if (part.type === 'weekday') weekdayStr = part.value;
    }

    // Map weekdayStr (Sun, Mon, Tue, Wed, Thu, Fri, Sat) to 0-6
    const weekdayMap: Record<string, number> = {
      Sun: 0,
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
    };
    const dayOfWeek = weekdayMap[weekdayStr] ?? date.getDay();

    return { year, month, day, dayOfWeek };
  } catch {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      dayOfWeek: date.getDay(),
    };
  }
}

/**
 * Format a YYYY-MM-DD string from year, month, day
 */
export function formatDateKey(year: number, month: number, day: number): string {
  const m = month < 10 ? `0${month}` : `${month}`;
  const d = day < 10 ? `0${day}` : `${day}`;
  return `${year}-${m}-${d}`;
}

/**
 * Format today's date in Asia/Karachi as YYYY-MM-DD for the min attribute of date inputs.
 */
export function getKarachiTodayString(): string {
  const { year, month, day } = getKarachiDateParts();
  return formatDateKey(year, month, day);
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MONTH_NAMES_SHORT = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
];

const WEEKDAY_NAMES = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const WEEKDAY_NAMES_SHORT = [
  'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'
];

/**
 * Build a structured date option from a plain Date object (in local day reckoning).
 */
export function createDateOptionFromDate(d: Date): DynamicDateOption {
  const year = d.getFullYear();
  const monthIdx = d.getMonth();
  const dayNum = d.getDate();
  const dayOfWeek = d.getDay();

  const weekdayShort = WEEKDAY_NAMES_SHORT[dayOfWeek];
  const weekdayFull = WEEKDAY_NAMES[dayOfWeek];
  const monthShort = MONTH_NAMES_SHORT[monthIdx];
  const monthFull = MONTH_NAMES[monthIdx];
  const dateKey = formatDateKey(year, monthIdx + 1, dayNum);

  return {
    id: `date-${dateKey}`,
    weekdayShort,
    day: `${dayNum}`,
    monthShort,
    weekdayFull,
    monthFull,
    year,
    fullLabel: `${weekdayFull}, ${dayNum} ${monthFull} ${year}`,
    dateKey,
  };
}

/**
 * Parses a YYYY-MM-DD calendar input string into a DynamicDateOption without UTC conversion issues.
 */
export function parseDateInputToOption(dateStr: string): DynamicDateOption | null {
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return null;
  const [yStr, mStr, dStr] = dateStr.split('-');
  const y = parseInt(yStr, 10);
  const m = parseInt(mStr, 10) - 1;
  const d = parseInt(dStr, 10);
  
  const dateObj = new Date(y, m, d, 12, 0, 0); // midday avoids DST shift
  return createDateOptionFromDate(dateObj);
}

/**
 * Generates the 4 dynamic date options following the specific rule:
 * 1. Find the next upcoming Saturday from current date in Asia/Karachi.
 * 2. Find the following Sunday.
 * 3. Find the next Friday after that Sunday.
 * 4. Find the Saturday immediately after that Friday.
 *
 * For Thursday 15 October 2026:
 * - Saturday 17 October 2026
 * - Sunday 18 October 2026
 * - Friday 23 October 2026
 * - Saturday 24 October 2026
 */
export function generateDynamicDateOptions(): DynamicDateOption[] {
  const { year, month, day, dayOfWeek } = getKarachiDateParts();
  
  // Create a base date using midday to prevent time-shift errors
  const currentBase = new Date(year, month - 1, day, 12, 0, 0);

  // 1. Next upcoming Saturday
  // dayOfWeek: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  // If today is Thursday (4), days to Saturday (6) = 2.
  // If today is Saturday (6), next upcoming is either today or +7. Let's make it upcoming (+7 if late, or today if still morning, but +7 guarantees future planning).
  let daysToNextSat = (6 - dayOfWeek + 7) % 7;
  if (daysToNextSat === 0) {
    // If today is Saturday, offer today and tomorrow or next week
    daysToNextSat = 0;
  }

  const date1_Sat = new Date(currentBase);
  date1_Sat.setDate(date1_Sat.getDate() + daysToNextSat);

  // 2. The following Sunday (1 day after date 1)
  const date2_Sun = new Date(date1_Sat);
  date2_Sun.setDate(date2_Sun.getDate() + 1);

  // 3. The next Friday after that Sunday (5 days after Sunday)
  const date3_Fri = new Date(date2_Sun);
  date3_Fri.setDate(date3_Fri.getDate() + 5);

  // 4. The Saturday immediately after that Friday (1 day after Friday)
  const date4_Sat = new Date(date3_Fri);
  date4_Sat.setDate(date4_Sat.getDate() + 1);

  return [
    createDateOptionFromDate(date1_Sat),
    createDateOptionFromDate(date2_Sun),
    createDateOptionFromDate(date3_Fri),
    createDateOptionFromDate(date4_Sat),
  ];
}
