# 💌 Little Karachi Date Invitation

> A charming, playful, and romantic single-page date invitation website crafted by **Razendary** with peak Pakistani & Karachi pookie energy, authentic Roman Urdu banter, and clean editorial design.

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📖 About The Project

**Little Karachi Date Invitation** is a lighthearted, interactive web experience designed to invite someone on a date in a memorable way. Rather than sending a plain text message, it guides the recipient through a whimsical multi-step questionnaire—from agreeing to the date, picking a Karachi food or chai spot, selecting flowers, choosing an open date, to entering their phone number and receiving a final personalized confirmation.

The experience is infused with natural Pakistani humor, Karachi street culture, and affectionate internet slang (*pookie, delulu, scene on, chai pe charcha, fries chori allowed*).

---

## ✨ Features & User Journey

1. **The Invitation Screen**:
   - Adorable photo of a cream kitten in a fluffy bunny hood.
   - Large coral-red primary button (*"Yes, obviously 💗"*).
   - **Playful Evasive "No" Button**: Hovering on desktop or tapping on mobile playfully dodges within a safe bounded container with rotating microcopy (*"Pookie, soch lo 🥺"*, *"Itni bhi kya nafrat 😭"*, *"Acha ji, pakka?"*, *"Last chance, pookie 💔"*).
   - Evasion is capped at **5 moves** so the interaction never becomes frustrating.
   - Fully accessible via keyboard (`Tab` + `Enter`/`Space`) for intentional selection.
   - Respectful, sweet response if "No" is chosen, with an option to reconsider (*"Say yes anyway? 💗"*).

2. **Karachi Date Food Selection (10 Curated Spots)**:
   - **Quetta Tea 10 Hotel ☕** (*kadak chai date*)
   - **Quetta Alamgir — Chai & Paratha** (*chai pe charcha*)
   - **Cafe Piyala — Pyala Chai** (*soft launch energy*)
   - **Aesthetic Chai Scene** (*main character moment*)
   - **KFC — Zinger Date 🍔** (*fries chori allowed*)
   - **McDonald's — Fries & McFlurry** (*share karna optional*)
   - **Bun Kebab & Cold Drink** (*low budget, high vibes*)
   - **Roll Paratha & Chai** (*sharing is a struggle*)
   - **Golgappay Challenge** (*tears of happiness*)
   - **Smash Burger Date** (*messy but iconic*)
   - Includes a gentle disclaimer: *"These are date ideas, not reservations. The actual spot can be decided together."*

3. **Bouquet Selection (4 Romantic Options)**:
   - Pink bouquet (*soft, sweet, and very pretty*)
   - Yellow bouquet (*bright enough to fix any bad day*)
   - Blue bouquet (*a little dreamy and impractical*)
   - Red bouquet (*dramatic in the nicest possible way*)

4. **Dynamic Date Selection (Asia/Karachi Timezone)**:
   - Automatically computes 4 upcoming weekend date presets based on the current date in Asia/Karachi (e.g. upcoming Saturday, Sunday, following Friday, following Saturday).
   - **Synchronized Calendar Picker**: Includes an interactive `<input type="date">` for custom dates with automatic past-date blocking (`min` date validation).

5. **Phone Number Entry**:
   - Supports Pakistani mobile numbers (`03XXXXXXXXX`, `+923XXXXXXXXX`) as well as international formats.
   - Validates format with helpful inline feedback.

6. **Personalized Confirmation**:
   - Expressive joyful kitten portrait inside a framed picture card with caption *"excellent news department"*.
   - Dynamic heading displaying the chosen date with correct weekday, day, month, and year.
   - Compact summary chips for selected date, food idea, and flowers.
   - **Copy This Little Invite**: Copies a formatted plain-text invitation summary to the clipboard (with fallback support for sandboxed webviews).
   - **Start Over**: One-click reset that clears every selection, input, and movement counter back to Screen 1.

---

## 🛠️ What Is Used in This Project

| Technology / Tool | Purpose |
| :--- | :--- |
| **React 19** | Modern UI components, hooks, and clean client-side state machine. |
| **TypeScript** | Strict type safety, structured models, and zero runtime type errors. |
| **Vite 8** | Lightning-fast development server and optimized static production build. |
| **Tailwind CSS v4** | Modern utility-first styling with custom CSS design tokens. |
| **Lucide React** | Clean, lightweight UI icons. |
| **Google Fonts** | `Plus Jakarta Sans` for clean typography + `Caveat` for handwritten accents. |
| **Local Static Images** | High-resolution photographic assets served directly from `/public/images/`. |

---

## 🚫 What Is NOT Used (Intentionally Excluded)

To keep this website lightweight, private, and frictionless:
- **No Backend Server**: 100% client-side application.
- **No Database**: Does not require PostgreSQL, MongoDB, Firebase, or Cloud SQL.
- **No User Accounts or Passwords**: No login barriers or registration forms.
- **No Third-Party Telemetry or Analytics**: Zero tracking scripts, cookies, or data loggers.
- **No Paid APIs or API Keys**: Runs completely free of external API quota limits.

---

## 🎯 Capabilities & Boundaries

### ✅ What This Website CAN Do:
- Guide a visitor through a smooth, responsive, 6-screen romantic invitation questionnaire.
- Persist user choices in React state when moving back and forth between questions.
- Dynamically calculate and roll forward suggested date options in the `Asia/Karachi` time zone.
- Format and copy an invitation summary to the user's clipboard.
- Provide accessible navigation via mouse, touch screen, and keyboard.
- Work offline or on any static web host (GitHub Pages, Vercel, Netlify, Cloud Run).

### ❌ What This Website CANNOT Do (By Design):
- **Does NOT send real SMS or WhatsApp messages**: The phone number field is a playful prototype step and is never transmitted anywhere.
- **Does NOT make real table reservations**: The selected food places are date ideas to coordinate together, not booking confirmations.
- **Does NOT store or share personal data**: All data lives solely in memory in the active browser tab and is cleared on tab close or when clicking "start over".

---

## 📁 Project Structure

```text
├── public/
│   ├── images/              # Static photos for kittens, Karachi food, and bouquets
│   │   └── README.md        # Guide explaining which image belongs to which screen
├── src/
│   ├── config/
│   │   └── siteConfig.ts    # Central editable configuration for all text, options & colors
│   ├── components/
│   │   ├── screens/         # Screen 1 to 6 components
│   │   │   ├── InvitationScreen.tsx
│   │   │   ├── FoodScreen.tsx
│   │   │   ├── FlowerScreen.tsx
│   │   │   ├── DateScreen.tsx
│   │   │   ├── PhoneScreen.tsx
│   │   │   └── ConfirmationScreen.tsx
│   │   ├── BackgroundShapes.tsx
│   │   ├── BouquetCard.tsx
│   │   ├── DateCard.tsx
│   │   ├── FoodCard.tsx
│   │   ├── FooterPill.tsx
│   │   ├── HeaderEyebrow.tsx
│   │   ├── NavigationControls.tsx
│   │   └── ProgressBar.tsx
│   ├── utils/
│   │   └── dateUtils.ts     # Asia/Karachi timezone date math and calendar parser
│   ├── App.tsx              # Main state machine and screen navigation
│   ├── index.css            # Tailwind CSS theme variables and retro offset shadows
│   └── main.tsx             # React entry point
├── tests/
│   └── audit.ts             # Automated 37-check launch-readiness test suite
├── .gitignore
├── LICENSE                  # MIT License
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm, pnpm, or bun

### 1. Clone the repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` (or the port shown in your terminal).

### 4. Build for production
```bash
npm run build
```
The static, production-ready website will be generated in the `dist/` directory.

### 5. Run the automated audit test suite
```bash
npx tsx tests/audit.ts
```

---

## 🎨 How to Customize

All content is centralized in one file: **`src/config/siteConfig.ts`**.

1. **Change text, jokes, or headings**:
   Open `src/config/siteConfig.ts` and modify strings under `invitation`, `food`, `flowers`, `dates`, or `confirmation`.

2. **Add or change Karachi date spots**:
   Edit the `options` array inside `SITE_CONFIG.food` in `src/config/siteConfig.ts`.

3. **Change colors**:
   Open `src/index.css` and adjust the `:root` CSS custom properties:
   - `--bg-warm-ivory` (`#F8F6F0`)
   - `--text-burgundy` (`#32141D`)
   - `--coral-red` (`#ED2517`)
   - `--deep-wine` (`#410C1B`)
   - `--dusty-rose` (`#CB8C96`)
   - `--pale-mint` (`#DDF0E8`)
   - `--sun-yellow` (`#F3D34D`)

4. **Swap images**:
   Drop your custom image into `/public/images/` and update the corresponding path in `src/config/siteConfig.ts`.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 💌 Creator

Made with questionable levels of pookie energy by **Razendary**.
