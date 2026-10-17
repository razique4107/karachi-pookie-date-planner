/**
 * Central configuration file for Razendary's Karachi Romantic Date Invitation Website.
 *
 * All headings, copy, Karachi date ideas, bouquet options, image references,
 * and button labels are centrally managed here for easy editing.
 */

export interface KarachiDateFoodOption {
  id: string;
  title: string;
  description: string;
  caption: string;
  image: string;
  alt: string;
}

export interface BouquetOption {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

export interface SiteConfig {
  meta: {
    author: string;
    appName: string;
    tagline: string;
  };
  invitation: {
    eyebrow: string;
    heading: string;
    supporting: string;
    kittenImage: string;
    kittenAlt: string;
    yesButtonText: string;
    noButtonText: string;
    initialMicrocopy: string;
    noEvasiveCaptions: string[];
    noClickedMessage: string;
    maxMoves: number;
  };
  food: {
    eyebrow: string;
    heading: string;
    supporting: string;
    unselectedPill: string;
    selectedPill: string;
    footnote: string;
    validationMessage: string;
    options: KarachiDateFoodOption[];
  };
  flowers: {
    eyebrow: string;
    heading: string;
    supporting: string;
    unselectedPill: string;
    selectedPill: string;
    validationMessage: string;
    options: BouquetOption[];
  };
  dates: {
    eyebrow: string;
    heading: string;
    supporting: string;
    calendarLabel: string;
    validationMessage: string;
  };
  phone: {
    eyebrow: string;
    heading: string;
    supporting: string;
    label: string;
    placeholder: string;
    buttonText: string;
    invalidErrorMessage: string;
    helpText: string;
  };
  confirmation: {
    eyebrow: string;
    heading: string;
    supporting: string;
    signature: string;
    kittenImage: string;
    kittenAlt: string;
    cardCaption: string;
    copyButtonText: string;
    copiedButtonText: string;
    startOverText: string;
  };
  theme: {
    bgWarmIvory: string;
    textBurgundy: string;
    coralRed: string;
    deepWine: string;
    dustyRose: string;
    paleMint: string;
    sunYellow: string;
  };
}

export const SITE_CONFIG: SiteConfig = {
  meta: {
    author: "Razendary",
    appName: "Little Karachi Date Invitation",
    tagline: "Romantic Karachi Date Invitation by Razendary",
  },
  invitation: {
    eyebrow: "okay pookie, hear me out...",
    heading: "Will you go on a date with me?",
    supporting: "I made you a whole website. Ab itni mehnat ke baad chai toh banti hai.",
    kittenImage: "/images/kitten_bunny_hood.jpg",
    kittenAlt: "Sweet cream and white kitten wearing a fluffy bunny hood",
    yesButtonText: "Yes, obviously 💗",
    noButtonText: "No 🙄",
    initialMicrocopy: "the uncool button is shy",
    maxMoves: 5,
    noEvasiveCaptions: [
      "Pookie, soch lo 🥺",
      "Itni bhi kya nafrat 😭",
      "Acha ji, pakka?",
      "Last chance, pookie 💔",
      "Acha ab ruk gaya hoon, agar sach mein No bolna hai toh bolo 🥺"
    ],
    noClickedMessage: "Acha, no worries pookie 😭💗 No hard feelings! Par agar dil badal jaye toh Yes wala button yahin hai.",
  },
  food: {
    eyebrow: "ab asli planning hogi",
    heading: "Pookie, khanay kahan chalna hai?",
    supporting: "Budget bhi dekh lete hain, vibes bhi.",
    unselectedPill: "pick me",
    selectedPill: "yes, this one",
    footnote: "These are date ideas, not reservations. The actual spot can be decided together.",
    validationMessage: "Pookie, pehle batao kahan chalna hai! Koi ek spot choose karo 🥺",
    options: [
      {
        id: "quetta-tea-10",
        title: "Quetta Tea 10 Hotel ☕",
        description: "Do cup chai, thori gossip, aur duniya ke maslay solve.",
        caption: "kadak chai date",
        image: "/images/karachi_chai_glass.jpg",
        alt: "Steaming hot roadside chai in traditional tea glass, Karachi cafe",
      },
      {
        id: "quetta-alamgir",
        title: "Quetta Alamgir — Chai & Paratha",
        description: "Kadak doodh patti, paratha, aur late-night wali baatein.",
        caption: "chai pe charcha",
        image: "/images/karachi_chai_paratha.jpg",
        alt: "Crispy lachha paratha served with hot doodh patti chai",
      },
      {
        id: "cafe-piyala",
        title: "Cafe Piyala — Pyala Chai",
        description: "Piyalay mein chai, aur dil mein thori si delulu.",
        caption: "soft launch energy",
        image: "/images/karachi_cafe_piyala.jpg",
        alt: "Chai served in an authentic ceramic clay pyala bowl",
      },
      {
        id: "aesthetic-chai",
        title: "Aesthetic Chai Scene",
        description: "Truck-art vibes, snacks, aur ek aur chai bas.",
        caption: "main character moment",
        image: "/images/karachi_aesthetic_chai.jpg",
        alt: "Karachi rooftop outdoor chai cafe with truck art and fairy lights",
      },
      {
        id: "kfc-zinger",
        title: "KFC — Zinger Date 🍔",
        description: "Fries share karna? Dekhte hain pyaar kitna gehra hai.",
        caption: "fries chori allowed",
        image: "/images/karachi_zinger_kfc.jpg",
        alt: "Golden crispy fried chicken zinger burger and french fries",
      },
      {
        id: "mcdonalds",
        title: "McDonald's — Fries & McFlurry",
        description: "Tum McFlurry lo, main fries churaun. Perfect partnership.",
        caption: "share karna optional",
        image: "/images/karachi_mcdonalds_mcflurry.jpg",
        alt: "Crispy french fries and Oreo McFlurry dessert",
      },
      {
        id: "bun-kebab",
        title: "Bun Kebab & Cold Drink",
        description: "Budget date, elite memories. Karachi core.",
        caption: "low budget, high vibes",
        image: "/images/karachi_bun_kebab.jpg",
        alt: "Traditional Karachi street style toasted bun kebab and chutney",
      },
      {
        id: "roll-paratha",
        title: "Roll Paratha & Chai",
        description: "Ek roll, do log, aur 'bas last bite' ke jhoot.",
        caption: "sharing is a struggle",
        image: "/images/karachi_paratha_roll.jpg",
        alt: "Fresh hot chicken boti paratha roll wrapped in paper",
      },
      {
        id: "gol-gappa",
        title: "Golgappay Challenge",
        description: "Jo pani zyada teekha handle kare, woh winner.",
        caption: "tears of happiness",
        image: "/images/karachi_golgappay.jpg",
        alt: "Crispy round golgappay platter with spicy tangy khatta pani",
      },
      {
        id: "smash-burger",
        title: "Smash Burger Date",
        description: "Burger itna messy ho ke napkins bhi haar maan jayein.",
        caption: "messy but iconic",
        image: "/images/karachi_smash_burger.jpg",
        alt: "Gourmet double smash burger with melted cheese and brioche bun",
      },
    ],
  },
  flowers: {
    eyebrow: "and, the soft stuff",
    heading: "Which flowers should I bring?",
    supporting: "No pressure, but petals make everything at least 40% more memorable.",
    unselectedPill: "pick me",
    selectedPill: "yes, this one",
    validationMessage: "Please choose a bouquet so I don't show up empty-handed!",
    options: [
      {
        id: "pink",
        title: "Pink bouquet",
        description: "soft, sweet, and very pretty",
        image: "/images/bouquet_pink.jpg",
        alt: "Romantic soft pink roses and peonies tied in pale kraft paper",
      },
      {
        id: "yellow",
        title: "Yellow bouquet",
        description: "bright enough to fix any bad day",
        image: "/images/bouquet_yellow.jpg",
        alt: "Sunny and cheerful bouquet with sunflowers and yellow ranunculus",
      },
      {
        id: "blue",
        title: "Blue bouquet",
        description: "a little dreamy and impractical",
        image: "/images/bouquet_blue.jpg",
        alt: "Dreamy pastel blue hydrangeas and soft white garden flowers",
      },
      {
        id: "red",
        title: "Red bouquet",
        description: "dramatic in the nicest possible way",
        image: "/images/bouquet_red.jpg",
        alt: "Dramatic crimson red roses wrapped in dark matte luxury paper",
      },
    ],
  },
  dates: {
    eyebrow: "pick a day",
    heading: "When are you free?",
    supporting: "Pick whichever one lets you sleep in the next morning (or whenever you're free).",
    calendarLabel: "Or choose your own date",
    validationMessage: "Please pick an open date so we can put it on the calendar!",
  },
  phone: {
    eyebrow: "last practical question",
    heading: "Where should I text you?",
    supporting: "Just your number, so I can send you the extremely official details.",
    label: "your phone number",
    placeholder: "0300 1234567 or +92 300...",
    buttonText: "Send the details",
    invalidErrorMessage: "Please enter a valid phone number (e.g. 03XXXXXXXXX or +92...) so I don't text a stranger!",
    helpText: "Pakistani mobile numbers (03XXXXXXXXX, +92...) and international numbers supported.",
  },
  confirmation: {
    eyebrow: "official confirmation",
    heading: "you just made me very happy :)",
    supporting: "Ab bas tum, main, chai aur thori si main-character energy.",
    signature: "made with questionable levels of pookie energy by Razendary",
    kittenImage: "/images/kitten_happy_confirm.jpg",
    kittenAlt: "Joyful cream, white, and orange kitten looking sweetly at camera",
    cardCaption: "excellent news department",
    copyButtonText: "Copy this little invite",
    copiedButtonText: "Copied to clipboard! 💌",
    startOverText: "start over",
  },
  theme: {
    bgWarmIvory: "#F8F6F0",
    textBurgundy: "#32141D",
    coralRed: "#ED2517",
    deepWine: "#410C1B",
    dustyRose: "#CB8C96",
    paleMint: "#DDF0E8",
    sunYellow: "#F3D34D",
  },
};
