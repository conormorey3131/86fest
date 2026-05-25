# 86 Fest 2026 — Landing Site

Single-page landing site for **86 Fest 2026**, Ireland's Toyota festival — led by the AE86, hosted by **JDM Classics**. Deployed to **86fest.ie**.

Plain HTML/CSS/JS — no framework, no build step. Drop it on any static host.

## File structure

```
86fest/
├── index.html      # markup, meta tags, OG previews, page structure
├── styles.css      # dark theme, mobile-first responsive styles, animations
├── script.js       # header scroll state, reveal-on-scroll, year stamp
├── logo/
│   └── logo.jpeg   # brand logo (used in header, footer, favicon, OG image)
└── README.md
```

## Local preview

Any static server will do. From this directory:

```bash
# Python 3
python3 -m http.server 8080

# or Node
npx serve .
```

Then visit <http://localhost:8080>.

## Deploying

### Netlify (drag-and-drop)
1. Go to <https://app.netlify.com/drop>
2. Drag the **whole `86fest` folder** in
3. Add a custom domain → `86fest.ie`, set the DNS records Netlify provides

### Netlify (Git-backed, recommended)
1. Push this folder to a GitHub repo
2. New site → import from Git → pick the repo
3. Build command: *(none)* · Publish directory: *(root, `.`)*
4. Custom domain → `86fest.ie`

### GitHub Pages
1. Push to a repo named e.g. `86fest-site`
2. Settings → Pages → Source: `main` branch, root
3. Add `CNAME` file containing `86fest.ie` to the repo
4. Point `86fest.ie` DNS at GitHub Pages (see GitHub docs)

### Cloudflare Pages
1. Connect repo, framework preset: *None*, build output: `/`
2. Add the custom domain in the Pages dashboard

## Placeholders to fill in

All flagged in `index.html` with `TODO` comments. Search the file for `TODO` to find them quickly. Summary:

| Where | What |
|---|---|
| Hero meta — `[DATE TBC]` | Real event date once confirmed |
| Hero meta — `[Mondello Park]` | Confirm / change venue if different |
| About section — `section__lead` | Refine the event intro copy |
| About section — three `.feature` cards | Refine each feature blurb |
| Tickets card 2 list — *"Sessions throughout the day"* | Confirm session details / pricing |
| Footer — `hello@86fest.ie` | Use real contact email (or remove) |

The Open Graph image is the existing logo. If you want a custom share image (1200×630 PNG/JPG works best), drop it at `logo/og-image.jpg` and update the two `og:image` / `twitter:image` tags in `index.html`.

## Links (already wired)

- Show car application → <https://forms.gle/n4jrZTy3vRsJw3TG6>
- Driver tickets → <https://mondellopark.checkfront.com/reserve/?preview=1&item_id=129>
- 86 Fest IG → <https://www.instagram.com/86fest.irl/>
- JDM Classics IG → <https://www.instagram.com/jdm_classics_irl/>
- JDM Classics FB → <https://www.facebook.com/profile.php?id=100070957250222>

All external links open in a new tab with `rel="noopener noreferrer"`.

## Design notes

- **Accent colour** (`--accent: #ff5a1f`) is the flame orange pulled from the logo. Change it in `:root` at the top of `styles.css` and everything updates.
- **Fonts** are loaded from Google Fonts: Bebas Neue (display), Inter (body), Zen Kaku Gothic New (Japanese). To self-host, swap the `<link>` in `index.html` and add the font files.
- **Animations** are CSS + a tiny IntersectionObserver. Users with `prefers-reduced-motion: reduce` get a static page automatically.
- **Mobile-first.** All breakpoints are min-width media queries; the default styles are the phone layout.

## Browser support

Modern evergreen browsers (Chrome, Safari, Firefox, Edge). Uses CSS custom properties, `backdrop-filter`, and `IntersectionObserver` — all widely supported in 2026.
