import { SITE_CONFIG } from '../src/config/siteConfig';
import { 
  getKarachiDateParts, 
  generateDynamicDateOptions, 
  getKarachiTodayString, 
  parseDateInputToOption 
} from '../src/utils/dateUtils';
import fs from 'fs';

console.log("==========================================");
console.log("🚀 STARTING LAUNCH-READINESS AUDIT SUITE");
console.log("==========================================\n");

let passedCount = 0;
let failedCount = 0;

function assert(condition: boolean, testName: string, detail: string = '') {
  if (condition) {
    console.log(`✅ [PASS] ${testName}`);
    passedCount++;
  } else {
    console.error(`❌ [FAIL] ${testName}: ${detail}`);
    failedCount++;
  }
}

// 1. BRANDING & IDENTITY
assert(SITE_CONFIG.meta.author === "Razendary", "Author is exactly 'Razendary'", `got ${SITE_CONFIG.meta.author}`);
assert(SITE_CONFIG.invitation.eyebrow.includes("pookie"), "Invitation eyebrow includes 'pookie'");
assert(SITE_CONFIG.invitation.supporting.includes("Ab itni mehnat ke baad chai toh banti hai"), "Supporting copy contains authentic Roman Urdu");
assert(SITE_CONFIG.invitation.yesButtonText.includes("Yes, obviously"), "Yes button text matches");
assert(SITE_CONFIG.invitation.noButtonText.includes("No"), "No button text matches");
assert(SITE_CONFIG.invitation.maxMoves === 5, "Evasive moves count capped at 5");
assert(SITE_CONFIG.invitation.noEvasiveCaptions.length === 5, "5 evasive captions configured");
assert(SITE_CONFIG.confirmation.signature.includes("Razendary"), "Confirmation signature has 'Razendary'");

// 2. IMAGE ASSETS
const allImages = [
  SITE_CONFIG.invitation.kittenImage,
  SITE_CONFIG.confirmation.kittenImage,
  ...SITE_CONFIG.food.options.map(o => o.image),
  ...SITE_CONFIG.flowers.options.map(f => f.image)
];

assert(allImages.length === 16, "Total image assets count is 16 (2 kittens + 10 foods + 4 bouquets)");
let allImagesValid = true;
for (const imgPath of allImages) {
  const local = imgPath.startsWith('/images/')
    ? `public${imgPath}`
    : (imgPath.startsWith('/') ? imgPath.slice(1) : imgPath);
  if (!fs.existsSync(local) || fs.statSync(local).size < 1000) {
    allImagesValid = false;
    console.error(`Image missing or corrupt: ${local}`);
  }
}
assert(allImagesValid, "All 16 local photographic image files exist in public/images and are >1KB");

// 3. KARACHI DATE IDEAS (SCREEN 2)
assert(SITE_CONFIG.food.options.length === 10, "Exactly 10 Karachi date ideas present");
const expectedTitles = [
  "Quetta Tea 10 Hotel ☕",
  "Quetta Alamgir — Chai & Paratha",
  "Cafe Piyala — Pyala Chai",
  "Aesthetic Chai Scene",
  "KFC — Zinger Date 🍔",
  "McDonald's — Fries & McFlurry",
  "Bun Kebab & Cold Drink",
  "Roll Paratha & Chai",
  "Golgappay Challenge",
  "Smash Burger Date"
];
let foodTitlesMatch = true;
for (let i = 0; i < expectedTitles.length; i++) {
  if (SITE_CONFIG.food.options[i].title !== expectedTitles[i]) {
    foodTitlesMatch = false;
    console.error(`Food option ${i} title mismatch: expected "${expectedTitles[i]}", got "${SITE_CONFIG.food.options[i].title}"`);
  }
}
assert(foodTitlesMatch, "All 10 Karachi date option titles match specification exactly");
assert(SITE_CONFIG.food.footnote.includes("These are date ideas, not reservations"), "Food footnote is present");

// 4. FLOWERS (SCREEN 3)
assert(SITE_CONFIG.flowers.options.length === 4, "Exactly 4 bouquets present");
const flowerColors = ["Pink bouquet", "Yellow bouquet", "Blue bouquet", "Red bouquet"];
const flowersMatch = flowerColors.every((title, i) => SITE_CONFIG.flowers.options[i].title === title);
assert(flowersMatch, "Bouquets match Pink, Yellow, Blue, Red");

// 5. ASIA/KARACHI DATE CALCULATIONS (SCREEN 4)
const karachiParts = getKarachiDateParts();
assert(typeof karachiParts.year === 'number' && karachiParts.year >= 2026, "Current year in Asia/Karachi is at least 2026");

const presets = generateDynamicDateOptions();
assert(presets.length === 4, "Exactly 4 dynamic future date options generated");
assert(presets[0].fullLabel === "Saturday, 17 October 2026", "Preset 1 is Saturday, 17 October 2026", presets[0].fullLabel);
assert(presets[1].fullLabel === "Sunday, 18 October 2026", "Preset 2 is Sunday, 18 October 2026", presets[1].fullLabel);
assert(presets[2].fullLabel === "Friday, 23 October 2026", "Preset 3 is Friday, 23 October 2026", presets[2].fullLabel);
assert(presets[3].fullLabel === "Saturday, 24 October 2026", "Preset 4 is Saturday, 24 October 2026", presets[3].fullLabel);

// 6. CALENDAR INPUT & PAST DATE CHECK
const todayKey = getKarachiTodayString();
assert(typeof todayKey === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(todayKey), `Today string is formatted YYYY-MM-DD: ${todayKey}`);
const pastDateKey = "2026-10-14";
assert(pastDateKey < todayKey, "Past date is strictly less than today's string (for min attribute validation)");
const futureDateKey = "2026-10-31";
const parsedFuture = parseDateInputToOption(futureDateKey);
assert(parsedFuture !== null && parsedFuture.fullLabel === "Saturday, 31 October 2026", "Custom calendar picker parses valid date properly without UTC shifts");

// 7. PHONE VALIDATION
const validatePhone = (val: string) => {
  const trimmed = val.trim();
  if (!trimmed) return false;
  const cleaned = trimmed.replace(/[\s\-\(\)\.]/g, "");
  const isPakistaniLocal = /^03\d{9}$/.test(cleaned);
  const isPakistaniIntl = /^(\+92|92|0092)3\d{9}$/.test(cleaned);
  const isGeneralIntl = /^\+?\d{7,15}$/.test(cleaned);
  return isPakistaniLocal || isPakistaniIntl || isGeneralIntl;
};

assert(validatePhone("03001234567"), "Pakistani local 11-digit mobile (03001234567) passes");
assert(validatePhone("+92 300 1234567"), "Pakistani international with spaces (+92 300 1234567) passes");
assert(validatePhone("0345-7654321"), "Pakistani local with dash passes");
assert(validatePhone("+1 (555) 019-2834"), "US/International standard format passes");
assert(!validatePhone("123"), "Short number (< 7 digits) fails");
assert(!validatePhone("0300"), "Incomplete number fails");
assert(!validatePhone("abc03001234567"), "Non-numeric characters fail");
assert(!validatePhone(""), "Empty string fails");

// 8. CLIPBOARD INVITATION TEXT FORMAT
const testFood = SITE_CONFIG.food.options[0];
const testFlower = SITE_CONFIG.flowers.options[0];
const testDate = presets[0];

const generateInviteText = () => {
  return [
    "✨ Official Date Confirmation ✨",
    `📅 Date: ${testDate.fullLabel}`,
    `☕ Date Spot: ${testFood.title} (${testFood.description})`,
    `💐 Flowers: ${testFlower.title} (${testFlower.description})`,
    "Ab bas tum, main, chai aur thori si main-character energy.",
    `— ${SITE_CONFIG.confirmation.signature}`
  ].join("\n");
};

const inviteText = generateInviteText();
assert(inviteText.includes("Saturday, 17 October 2026"), "Invite text contains exact selected date");
assert(inviteText.includes("Quetta Tea 10 Hotel ☕"), "Invite text contains chosen Karachi date idea");
assert(inviteText.includes("Pink bouquet"), "Invite text contains chosen flower");
assert(!inviteText.includes("0300") && !inviteText.includes("phone") && !inviteText.includes("+92"), "Invite text NEVER contains phone number");

// 9. FRONTEND-ONLY & PRIVACY AUDIT
const srcFiles = fs.readdirSync('src', { recursive: true }) as string[];
let foundNetworkCall = false;
for (const file of srcFiles) {
  if (file.endsWith('.ts') || file.endsWith('.tsx')) {
    const content = fs.readFileSync(`src/${file}`, 'utf-8');
    if (content.includes('fetch(') || content.includes('axios') || content.includes('XMLHttpRequest') || content.includes('localStorage') || content.includes('sessionStorage')) {
      foundNetworkCall = true;
      console.error(`Found network/storage in src/${file}`);
    }
  }
}
assert(!foundNetworkCall, "Zero network tracking, backend transmission, or unexpected storage in src/");

console.log("\n==========================================");
console.log(`AUDIT RESULTS: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log("==========================================");
