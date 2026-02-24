# GitHub Copilot Instructions — sagasthy.github.io

## Project Overview

This is a **Docusaurus 3** static site (knowledge base) deployed to GitHub Pages. It contains Markdown/MDX docs, static HTML presentations, and custom styling.

- **Site URL:** https://sagasthy.github.io
- **Framework:** Docusaurus 3.7+ with the `classic` preset
- **Node:** >=18 (Node 22 in CI)
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
└── .github/
    ├── workflows/deploy.yml       # CI/CD pipeline
    └── copilot-instructions.md    # This file
```

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

- **`id`** — Unique identifier matching the filename (without `.md`). Use kebab-case.
- **`title`** — Display title for the sidebar and browser tab. Wrap in quotes if it contains special characters.
- **`sidebar_position`** — Integer controlling sort order within its sidebar category. Check existing items in the same category and pick the next available number.
- **`tags`** — Array of tags for categorization. Use consistent tag names by checking existing docs first.

### 2. Sidebar Registration (required)

Add the new doc's path to `sidebars.js` under the appropriate category. The sidebar uses **explicit item lists**, not auto-generation.

The item string is the path relative to `docs/` without the `.md` extension (e.g., `reference/my-new-page`).

Example — adding a new reference doc:

```js
{
  type: "category",
  label: "Reference",
  items: [
    "reference/build-failure-agent",
    "reference/github-copilot-guide",
    "reference/my-new-page",           // <-- add new items here
  ],
  collapsed: false,
},
```

### Adding a New Sidebar Category

If the doc belongs to a new category that doesn't exist yet, add a new category object to the `docsSidebar` array in `sidebars.js`:

```js
{
  type: "category",
  label: "New Category",
  items: ["new-category/first-doc"],
  collapsed: false,
},
```

## MDX Formatting Rules (Critical)

Docusaurus 3 uses **MDX v3** to compile Markdown. MDX parses HTML as JSX, which is stricter than standard HTML-in-Markdown. Violations cause **build-breaking compilation errors**.

### Self-Closing Tags

All HTML void elements **must** be self-closing. This is the single most common source of build errors in this project.

| ❌ Wrong (HTML)          | ✅ Correct (JSX/MDX)      |
|--------------------------|---------------------------|
| `<br>`                   | `<br/>`                   |
| `<hr>`                   | `<hr/>`                   |
| `<img src="x">`         | `<img src="x"/>`         |
| `<input type="text">`   | `<input type="text"/>`   |

### Other MDX Pitfalls

- **No `class` attribute** — use `className` instead.
- **No inline `style` strings** — use object syntax: `style={{ color: 'red' }}`.
- **No HTML comments** — use `{/* JSX comment */}` instead of `<!-- comment -->`.
- **Curly braces are special** — literal `{` or `}` in text must be escaped as `{'{'}` / `{'}'}`, or placed inside backtick code spans / fenced code blocks.
- **`<` in text** — angle brackets outside of JSX tags can cause parse errors. Use `&lt;` or wrap in backticks.
- **Fenced code blocks are safe** — MDX does not parse HTML/JSX inside triple-backtick code blocks, so no escaping is needed there.

### Tables with Rich Content

When writing Markdown tables that contain inline HTML (e.g., `<br/>` for line breaks within cells), ensure every HTML tag is self-closing or has an explicit closing tag. Tables are the most common place where `<br>` vs `<br/>` issues occur.

## Docusaurus Config Notes

- **`docusaurus.config.js`** — Main configuration. Uses ES module syntax (`export default`).
- **`onBrokenLinks: "log"`** — Broken links produce warnings, not build errors.
- **Blog is disabled** (`blog: false`).
- **Dark mode** is the default color mode.
- **Prism languages** configured: bash, json, yaml, python, java. To add more, update `prism.additionalLanguages` in `docusaurus.config.js`.

## Static HTML Pages

Standalone HTML files (presentations, interactive content) go in `static/`. They are served at the site root (e.g., `static/my-page.html` → `https://sagasthy.github.io/my-page.html`).

If a static HTML page should appear in the site footer navigation, add a link entry in the `footer.links` array in `docusaurus.config.js`:

```js
{
  label: "Page Name",
  href: "pathname:///my-page.html",
},
```

## Style Guidelines

- Use emoji in section headings for visual navigation (e.g., `## 🚀 Section Name`).
- Use **bold** for key terms on first mention.
- Use Markdown tables for structured comparisons.
- Use `>` blockquotes for callouts and important notes.
- Maintain a consistent heading hierarchy — do not skip levels (e.g., don't jump from `##` to `####`).
- End files with a single trailing newline.

## Pre-Commit Checklist

Before considering any change complete, verify:

1. **Frontmatter** is present and well-formed on any new or modified doc file under `docs/`.
2. **`sidebars.js`** includes entries for any newly added doc pages.
3. **No raw HTML void elements** — all `<br>`, `<hr>`, `<img>`, etc. must be self-closing (`<br/>`, `<hr/>`, `<img/>`).
4. **Build passes** — run `npm run build` and confirm zero MDX compilation errors.
5. **Links work** — review build output for any broken link warnings.