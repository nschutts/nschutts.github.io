# Nick Schutts — Portfolio

A multi-page portfolio site built with plain HTML/CSS/JS (no build step, no
framework). Technical-drawing aesthetic, an animated circuit-trace
background, and an expanding "chip" navigation on the home page.

## Files
- `index.html` — home page (hero with icon links, about, skills, chip nav)
- `experience.html` — work history timeline
- `projects.html` — project list
- `project-dashboard-enclosure.html` — Formula UBC dashboard enclosure write-up
- `project-two-claw.html` — APSC 101 Two-Claw robot write-up
- `project-vsvb.html` — Vehicle System Validation Board (in progress)
- `education.html` — academic record
- `style.css` — all styling, shared across every page
- `script.js` — animated background, image lightbox, footer year — shared across every page
- `Nick_Schutts_Resume.pdf` — downloadable résumé, linked from the home page and every footer
- `assets/img/` — project photos and the rasterized engineering drawing
- `assets/Dash_Enclosure_Drawings.pdf` — original CAD drawing, linked for download

There's no dedicated Contact page — email, LinkedIn, GitHub, and résumé are
all reachable as icon links right in the home page hero (the first thing you
see) and again in every page's footer.

## Finishing the Two-Claw and VSVB pages
Both have real structure but need your input:
- `project-two-claw.html` has `<!-- Nick: ... -->` comments and
  `[bracketed placeholders]` marking where to add the real story.
- `project-vsvb.html` is deliberately styled as "in progress" (dashed
  border, hatched placeholder image, an "IN PROGRESS" badge) and has the
  same bracketed-placeholder pattern. As the project develops, replace the
  placeholders, drop photos into `assets/img/`, and you can remove the
  dashed/hatched treatment whenever it's ready to look "finished" — just
  delete `class="in-progress"` from its tile in `projects.html` and swap the
  `badge-progress` span and `thumb-placeholder` for real content.

## Editing content
Each page is a normal HTML file — open the one you want to change and edit
the text directly. The nav bar and footer are repeated in every file (plain
HTML has no shared template), so if you change a link, update it across all
files to keep them consistent.

To change colors or fonts, edit the `:root { ... }` block at the top of
`style.css`.

## The animated background
`script.js` draws a circuit-trace network on a canvas fixed behind the whole
site — nodes connected by traces, with small pulses of light traveling along
them, and everything brightening near your cursor. It runs on every page
automatically and turns static for visitors with "reduce motion" on.

## Home page layout
- The dashboard outline sits directly to the right of your name in the hero
  (`.hero-name-row` in `index.html`) — it wraps below the name automatically
  on narrow screens.
- The "Toolkit" section is three columns (`Design & CAD`, `Analysis &
  Simulation`, `Manufacturing`), each with its own header and a couple of
  empty `tick-empty` slots to fill in later.
- The bottom "Explore" section is a simple line of three links
  (`.explore-line`) to Experience, Projects, and Education.

## Home page icon links
The Email / LinkedIn / GitHub / Resume row in the hero uses `.icon-link`
elements inside `.icon-row.on-dark` (the `on-dark` modifier keeps them
legible against the dark hero background). The same icon style, without
`on-dark`, is available for use on light-background pages if you ever want
it elsewhere.

## Image lightbox
Any `<img class="lightbox-img" ...>` becomes clickable — clicking opens it
full-screen, click again (or press Escape) to close.

## Updating your résumé
Replace `Nick_Schutts_Resume.pdf` with your new file, keeping the same
filename — every link on the site already points to it.

## Deploying with GitHub Pages
1. Create a new GitHub repo (public).
2. Upload everything in this folder, **keeping the folder structure** — drag
   the whole `assets` folder in at once so the `img` subfolder and its
   contents stay nested correctly.
3. In the repo, go to **Settings → Pages**, set **Source** to the `main`
   branch and `/ (root)`, then save.
4. Your site goes live at `https://<username>.github.io/<repo-name>/`
   within a minute or two.
