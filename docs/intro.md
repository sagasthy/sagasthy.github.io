---
id: intro
title: Welcome
sidebar_position: 1
slug: /intro
---

# Welcome to the Knowledge Base

A curated collection of notes, insights, and references from engineering talks, research, and hands-on experience.

## What's Here

This knowledge base contains a mix of **Markdown documents** (rendered right here) and **standalone HTML pages** (presentations, interactive notes) — all living together seamlessly.

### 📄 Markdown Docs

Browse the sidebar to find structured notes organized by category:

- **Webinars** — Notes and takeaways from engineering talks and webinars
- **Reference** — Architecture docs, design references, and technical deep-dives

### 🌐 HTML Pages

Some content is better served as standalone pages with custom layouts:

- [AMPECO Webinar — Interactive Notes](pathname:///ampeco-webinar.html) — Full visual notes from the AI-native engineering webinar
- [Build Failure Agent — Presentation](pathname:///build-failure-agent-presentation.html) — Slide deck for the autonomous build failure analyzer

## Adding New Content

### Adding a Markdown doc

Create a `.md` file in the `docs/` directory:

```markdown
---
id: my-new-doc
title: My New Document
sidebar_position: 3
---

# My New Document

Your content here. Supports **bold**, *italic*, `code`, and more.
```

Then add the doc ID to `sidebars.js` so it appears in the navigation.

### Adding an HTML page

Drop any `.html` file into the `static/` directory. It will be served at the root URL path:

- `static/my-page.html` → available at `/my-page.html`

## Tech Stack

This site is built with [Docusaurus](https://docusaurus.io/) and deployed to GitHub Pages via GitHub Actions.

| Layer | Technology |
|-------|-----------|
| Static site generator | Docusaurus 3 |
| Markdown rendering | MDX (via Docusaurus) |
| Styling | CSS Modules + custom theme |
| Deployment | GitHub Actions → GitHub Pages |
| HTML pages | Served from `static/` directory |