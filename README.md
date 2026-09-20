# Nick Schutts — Portfolio

Source for my personal portfolio site, built to showcase my engineering
work at UBC and with Formula UBC Racing.

**Live site:** [nschutts.github.io](https://nschutts.github.io)


## About

I'm a second-year Engineering Physics student at the University of British
Columbia, currently working on the electrical subteam for Formula UBC
Racing's 2025/26 Formula SAE car. This site collects my project work,
experience, and background in one place — from a 3D-printed dashboard
enclosure that raced at FSAE Michigan to an autonomous block-sorting robot
built in first year.

## Stack

Static HTML, CSS, and vanilla JavaScript — no framework, no build step,
no dependencies. Hosted on GitHub Pages.

The visual language is built around technical engineering drawings: a
drafting-sheet color palette, monospace data labels, and dimensioned line
art traced from an actual SolidWorks drawing. The background on every page
is a live canvas animation — a procedurally generated circuit-trace network
with signal pulses that respond to the cursor — built to echo the
electrical work the site documents.

## Structure

```
index.html                          Home
about.html                          Bio, photo, contact details
experience.html                     Work history
education.html                      Academic record
projects.html                       Project index
project-dashboard-enclosure.html    Formula UBC dashboard enclosure
project-two-claw.html               Autonomous claw robot (APSC 101)
project-vsvb.html                   Vehicle System Validation Board (in progress)
style.css                           Site-wide styling
script.js                           Background animation, lightbox, misc. UI
assets/                             Photos, engineering drawings, résumé
```

Every page is a standalone HTML file — there's no templating layer, so
shared elements like the nav and footer are repeated across files by
design, keeping the whole thing dependency-free and easy to host anywhere
that serves static files.

## Notable details

- **Engineering drawings as design elements** — the dashboard enclosure's
  outline on the home page is traced directly from its SolidWorks drawing,
  dimensions and all.
- **Real project documentation** — build photos, CAD renders, and the
  original PDF drawing are all included, not just descriptions.
- **No layout shift on interaction** — hover states throughout the site
  (card lifts, image reveals) use transforms and reserved space rather than
  resizing elements, so nothing else on the page moves.
- **Lightbox viewer** — any project photo can be opened full-screen for a
  closer look.

## Contact

- Email: nicholas.schutts@gmail.com
- LinkedIn: [linkedin.com/in/nick-schutts](https://www.linkedin.com/in/nick-schutts-b05521326/)
- GitHub: [github.com/nschutts](https://github.com/nschutts)
