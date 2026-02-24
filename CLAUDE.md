# CLAUDE.md — Project Instructions for Claude Code

## Project Overview

This is a **Docusaurus 3** static site (knowledge base) deployed to GitHub Pages. It contains Markdown docs, static HTML presentations, and custom styling.

- **Site URL:** https://sagasthy.github.io
- **Framework:** Docusaurus 3.7+ with the `classic` preset
- **Node:** >=18, currently using Node 22 in CI
- **Package manager:** npm (`npm ci` / `npm run build`)
- **Deploy:** GitHub Actions → GitHub Pages (on push to `main`)

## Project Structure

```
├── docs/                          # Markdown/MDX documentation pages
│   ├── intro.md                   # Landing page (slug: /intro)
│   ├── reference/                 # Reference articles
│   └── webinars/                  # Webinar notes
├── src/
│   ├── css/custom.css             # Global style overrides
│   └── pages/                     # Custom React pages
├── static/                        # Static assets served as-is
│   ├── img/                       # Images (logo, favicon, etc.)
│   └── *.html                     # Standalone HTML presentations
├── sidebars.js                    # Explicit sidebar configuration
├── docusaurus.config.js           # Site-wide Docusaurus config
├── package.json                   # Dependencies and scripts
├── .github/
│   ├── workflows/deploy.yml       # CI/CD pipeline
│   └── copilot-instructions.md    # GitHub Copilot instructions
└── CLAUDE.md                      # This file
```

## Key Commands

- `npm start` — Start local dev server with hot reload
- `npm run build` — Production build (outputs to `build/`)
- `npm run serve` — Serve the production build locally
- `npm run clear` — Clear Docusaurus cache (useful when things look stale)

## Adding New Documentation Pages

Every new `.md` file under `docs/` **must** have two things to appear on the site:

### 1. YAML Frontmatter (required)

Every doc file must start with a YAML frontmatter block. Follow this exact pattern:

```yaml
---
id: my-page-id
title: "Human-Readable Page Title"
sidebar_position: 2
tags: [Tag1, Tag2, Category]
---
```

- `id` — Unique identifier, must match the filename (without `.md`). Use kebab-case.
- `title` — Display title for the sidebar and browser tab. Wrap in quotes if it contains special characters.
- `sidebar_position` — Integer controlling sort order within its sidebar category. Check existing items in the same category and pick the next available number.
- `tags` — Array of tags for categorization. Look at existing docs for consistent tag naming.

### 2. Sidebar Registration (required)

Add the new doc's path to `sidebars.js` under the appropriate category. The sidebar uses **explicit item lists**, not auto-generation.

```js
// sidebars.js — example structure
const sidebars = {
  docsSidebar: [
    "intro",
    {
      type: "category",
      label: "Category Name",
      items: [
        "subfolder/existing-doc",
        "subfolder/your-new-doc",    // <-- Add here
      ],
      collapsed: false,
    },
  ],
};
```

The item string is the path relative to `docs/` without the `.md` extension (e.g., `reference/my-new-page`).

### Adding a New Sidebar Category

If the doc belongs to a new category, add a new category object to the `docsSidebar` array in `sidebars.js`:

```js
{
  type: "category",
  label: "New Category",
  items: ["new-category/first-doc"],
  collapsed: false,
},
```

## MDX Formatting Rules (Critical)

Docusaurus 3 uses **MDX v3** to compile Markdown. MDX parses HTML as JSX, which has stricter rules than standard Markdown. Violations cause build-breaking compilation errors.

### Self-Closing Tags

All HTML void elements **must** be self-closing. This is the most common source of build errors.

| ❌ Wrong (HTML) | ✅ Correct (JSX) |
|-----------------|-------------------|
| `<br>`          | `<br/>`           |
| `<hr>`          | `<hr/>`           |
| `<img src="x">` | `<img src="x"/>` |
| `<input type="text">` | `<input type="text"/>` |

### Other MDX Rules

- **No `class` attribute** — use `className` instead.
- **No inline `style` strings** — use `style={{ color: 'red' }}` (object syntax) if needed.
- **No HTML comments** — use `{/* JSX comment */}` instead of `<!-- HTML comment -->`.
- **Curly braces are special** — literal `{` or `}` in text must be escaped as `{'{'}` or `{'}'}`, or placed in code blocks/backticks.
- **`<` in text** — angle brackets outside of tags can cause parse errors. Use `&lt;` or wrap in backticks.

### Tables with Rich Content

When writing Markdown tables that contain HTML (e.g., `<br/>` for line breaks within cells), ensure every HTML tag is self-closing or has an explicit closing tag. This is where most MDX errors occur.

### Code Blocks

Fenced code blocks (triple backticks) are safe zones — MDX does not parse HTML/JSX inside them. No special escaping is needed within code blocks.

## Docusaurus Config Notes

- **`docusaurus.config.js`** — Main configuration. Uses ES module syntax (`export default`).
- **`onBrokenLinks: "log"`** — Broken links are logged as warnings, not build errors.
- **Blog is disabled** (`blog: false`).
- **Dark mode** is the default color mode.
- **Prism languages** configured: bash, json, yaml, python, java. Add more in `docusaurus.config.js` under `prism.additionalLanguages` if needed.

## Static HTML Pages

Standalone HTML files (presentations, interactive content) go in `static/`. They are served at the site root as-is (e.g., `static/my-page.html` → `https://sagasthy.github.io/my-page.html`).

If a static HTML page should appear in the site footer, add a link entry in the `footer.links` array in `docusaurus.config.js`:

```js
{
  label: "Page Name",
  href: "pathname:///my-page.html",
},
```

## Style Guidelines

- Use emoji in section headings for visual navigation (e.g., `## 🚀 Section Name`).
- Use bold for key terms on first mention.
- Use Markdown tables for structured comparisons.
- Use `>` blockquotes for callouts and important notes.
- Keep a consistent heading hierarchy — don't skip levels (e.g., don't jump from `##` to `####`).
- End files with a blank newline.

## Pre-Commit Checklist

Before considering a change complete, verify:

1. **Frontmatter** is present and complete on any new/modified doc files.
2. **`sidebars.js`** includes any new doc pages.
3. **No raw HTML void elements** — all `<br>`, `<hr>`, `<img>` etc. are self-closing (`<br/>`, `<hr/>`, `<img/>`).
4. **Build passes** — run `npm run build` to verify no MDX compilation errors.
5. **Links work** — check build output for broken link warnings.