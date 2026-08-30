# CareerX Network — 教會職青網絡

A static, no-build-step website for CareerX Network, a community for Christian
young professionals. Built with plain HTML, CSS, and JavaScript — no framework,
no bundler, just files you can open in a browser or host anywhere.

## Structure

```
careerx-network/
├── index.html      # all page content and structure
├── styles.css      # design system + layout (see tokens at the top of the file)
├── script.js       # mobile nav, scroll-reveal, join-form handling
├── assets/
│   └── logo.jpg    # the CareerX Network mark
└── README.md
```

## Running it locally

No install needed. Either:

- Double-click `index.html` to open it directly in a browser, or
- Serve it locally so relative paths behave exactly like production:
  ```bash
  cd careerx-network
  python3 -m http.server 8000
  # then visit http://localhost:8000
  ```

## Editing content

- **Copy & sections**: edit `index.html` directly — headings, event dates,
  stats, and pillar descriptions are plain text in the markup.
- **Colors & type**: everything flows from the CSS variables at the top of
  `styles.css` (`:root { ... }`). Change `--violet`, `--magenta`, `--cyan`,
  or the font names there to re-theme the whole site.
- **Events**: each entry under `#events` is one `.event-row` block in
  `index.html` — copy/paste a block and edit the date, title, and blurb.

## The join form

The form at the bottom of the page (`#joinForm`) is currently front-end only —
it shows a confirmation message but doesn't send data anywhere, since a static
site has no backend. To actually collect submissions, pick one:

- **Formspree / Getform / Web3Forms** — free form-backend services. Sign up,
  then set `<form id="joinForm" action="https://formspree.io/f/yourFormId" method="POST">`
  in `index.html` and remove the `event.preventDefault()` line in `script.js`.
- **A Google Form** — swap the `#join` section for an embedded Google Form.
- **Your own backend** — point `action` at your own endpoint.

## Publishing it on GitHub (GitHub Pages)

This repo is ready to push and host for free with GitHub Pages. From inside
this `careerx-network` folder:

```bash
git init
git add .
git commit -m "Initial CareerX Network site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/careerx-network.git
git push -u origin main
```

Then on GitHub:

1. Go to your repo → **Settings** → **Pages**.
2. Under "Build and deployment", set **Source** to `Deploy from a branch`.
3. Set **Branch** to `main` and folder to `/ (root)`, then **Save**.
4. GitHub will publish the site at `https://YOUR-USERNAME.github.io/careerx-network/`
   within a minute or two.

If you'd rather create the repo from GitHub's website first, create a new
empty repository named `careerx-network` (don't initialize it with a README),
then run the same `git remote add` / `git push` commands above.

## Notes

- Fonts are loaded from Google Fonts (Space Grotesk, Inter, Noto Sans TC,
  IBM Plex Mono) via a `<link>` in `index.html` — no local font files needed.
- The site respects `prefers-reduced-motion` and is responsive down to
  small mobile widths.
