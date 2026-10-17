# Image Assets Guide for Razendary's Date Invitation

All images are stored in `public/images/` and served at `/images/...` so they work seamlessly in both local development and the published/production build.

---

### Screen 1 — The Invitation
- **Kitten in Bunny Hood**:
  - Path: `/images/kitten_bunny_hood.jpg`
  - Usage: The sweet cream-and-white kitten wearing a knitted bunny hood at the top of the invitation screen.
  - Recommended size: Square 1:1 ratio.

---

### Screen 2 — Karachi Date Food Options
All ten food cards use square (1:1) photographs:
1. **Quetta Tea 10 Hotel ☕**: `/images/karachi_chai_glass.jpg`
2. **Quetta Alamgir — Chai & Paratha**: `/images/karachi_chai_paratha.jpg`
3. **Cafe Piyala — Pyala Chai**: `/images/karachi_cafe_piyala.jpg`
4. **Aesthetic Chai Scene**: `/images/karachi_aesthetic_chai.jpg`
5. **KFC — Zinger Date 🍔**: `/images/karachi_zinger_kfc.jpg`
6. **McDonald's — Fries & McFlurry**: `/images/karachi_mcdonalds_mcflurry.jpg`
7. **Bun Kebab & Cold Drink**: `/images/karachi_bun_kebab.jpg`
8. **Roll Paratha & Chai**: `/images/karachi_paratha_roll.jpg`
9. **Golgappay Challenge**: `/images/karachi_golgappay.jpg`
10. **Smash Burger Date**: `/images/karachi_smash_burger.jpg`

---

### Screen 3 — Flower Selection
Four 4:3 bouquet photographs:
1. **Pink bouquet**: `/images/bouquet_pink.jpg`
2. **Yellow bouquet**: `/images/bouquet_yellow.jpg`
3. **Blue bouquet**: `/images/bouquet_blue.jpg`
4. **Red bouquet**: `/images/bouquet_red.jpg`

---

### Screen 6 — Final Confirmation
- **Joyful Kitten Photo**:
  - Path: `/images/kitten_happy_confirm.jpg`
  - Usage: Displayed in the left picture-card frame with caption "excellent news department".
  - Recommended size: 4:3 ratio.

---

### How to Replace Images
1. Save your new image in `/public/images/`.
2. Update the corresponding `image` path in `src/config/siteConfig.ts` (e.g. `/images/my_photo.jpg`).
