# Premium Wedding Invitation Website 💍

A fully responsive, premium wedding invitation website designed for GitHub Pages.

## Features

- 💌 Folded invitation-card opening screen
- 🎀 Ribbon + knot animation and “Click to Open” interaction
- 💑 Bride & groom names and portraits
- 📅 Wedding date + live countdown timer
- 📍 Venue, address and Google Maps button
- 🕰 Ceremony / reception / dinner timeline
- 🖼 Responsive wedding gallery with lightbox
- 📝 RSVP form with email fallback
- 🎵 Optional background music
- ✨ Scroll-reveal animations
- 📱 Mobile-first responsive design
- ♿ Reduced-motion support
- ⚙️ One-file configuration (`assets/js/config.js`)

## 1. Customize

Open `assets/js/config.js` and change:

- `bride`
- `groom`
- `date`
- `dateLabel`
- `venue`
- `address`
- `mapUrl`
- `bridePhoto`
- `groomPhoto`
- `musicUrl`

Replace the placeholder SVG files in `assets/images/` with your own JPG/PNG images if desired.

Example:

```js
bridePhoto: "assets/images/bride.jpg",
groomPhoto: "assets/images/groom.jpg"
```

For RSVP email fallback:

```js
rsvpEmail: "your@email.com"
```

## 2. Run locally

No build tools are required.

You can open `index.html` directly in a browser. For best results, use a local server such as VS Code Live Server.

## 3. Publish on GitHub Pages

1. Create a new GitHub repository, e.g. `wedding-invitation`.
2. Upload all files and folders from this project.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`.
6. Save.
7. GitHub will give you a public URL.

### Optional custom domain

In GitHub Pages settings, add your domain and create the required DNS records at your domain provider.

## Notes

The website is intentionally static, so it works directly on GitHub Pages. The RSVP form uses a mailto fallback by default. For a true database-backed RSVP system, connect the form to Formspree, Google Apps Script, Firebase, Supabase, or your own API.
