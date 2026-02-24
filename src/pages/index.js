import React, { useState, useEffect, useCallback } from "react";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

const DOCUMENTS = [
  {
    title: "AI-Native Engineering: How AMPECO Rebuilt Its Software Engine",
    description:
      "How AMPECO adopted autonomous AI agent workflows to ship daily releases, rewrite legacy modules, and scale engineering output — featuring insights from CEO Orlin Radev and CTO Alexander Alexiev.",
    icon: "🤖",
    href: "/ampeco-webinar.html",
    category: "webinar",
    tags: [
      { label: "AMPECO", color: "blue" },
      { label: "AI Agents", color: "blue" },
      { label: "Feb 2026", color: "green" },
    ],
    search:
      "ai-native engineering ampeco rebuilt software engine autonomous ai agent workflows daily releases rewrite legacy modules scale engineering output orlin radev alexander alexiev",
  },
  {
    title: "AI-Powered Build Failure Analyzer & Fixer",
    description:
      "An autonomous agent that detects, analyzes, and fixes CI/CD build failures using GitHub Copilot SDK + Claude BYOK — with enterprise safety gates, risk classification, and OpenShift deployment.",
    icon: "🛠️",
    href: "/build-failure-agent-presentation.html",
    category: "reference",
    tags: [
      { label: "Copilot SDK", color: "blue" },
      { label: "CI/CD", color: "blue" },
      { label: "Ideation", color: "purple" },
      { label: "Feb 2026", color: "green" },
    ],
    search:
      "ai-powered build failure analyzer fixer autonomous code fix agent github copilot sdk byok claude openshift ci cd pipeline automated incident response enterprise compliance safety risk levels broadridge",
  },
];

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "webinar", label: "Webinars" },
  { key: "guide", label: "Guides" },
  { key: "reference", label: "Reference" },
  { key: "notes", label: "Notes" },
];

function normalize(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function Tag({ label, color }) {
  return (
    <span className={`${styles.tag} ${styles[`tag_${color}`]}`}>{label}</span>
  );
}

function Card({ doc }) {
  return (
    <a className={styles.card} href={doc.href}>
      <div className={styles.cardIcon}>{doc.icon}</div>
      <h3 className={styles.cardTitle}>{doc.title}</h3>
      <p className={styles.cardDescription}>{doc.description}</p>
      <div className={styles.cardMeta}>
        {doc.tags.map((tag, i) => (
          <Tag key={i} label={tag.label} color={tag.color} />
        ))}
      </div>
      <span className={styles.cardArrow}>→</span>
    </a>
  );
}

function ComingSoon() {
  return (
    <div className={styles.comingSoon}>
      <span className={styles.comingSoonIcon}>📚</span>
      <h3 className={styles.comingSoonTitle}>More documents coming soon</h3>
      <p className={styles.comingSoonText}>
        New notes and resources will appear here.
      </p>
    </div>
  );
}

function NoResults() {
  return (
    <div className={styles.noResults}>
      <div className={styles.noResultsIcon}>🔍</div>
      <h3 className={styles.noResultsTitle}>No matching documents</h3>
      <p className={styles.noResultsText}>
        Try a different search term or clear filters.
      </p>
    </div>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filterDocs = useCallback(() => {
    const terms = normalize(query).split(" ").filter(Boolean);
    return DOCUMENTS.filter((doc) => {
      const matchesCategory =
        activeCategory === "all" || doc.category === activeCategory;
      const searchText = normalize(
        `${doc.search} ${doc.title} ${doc.description}`,
      );
      const matchesSearch =
        terms.length === 0 || terms.every((t) => searchText.includes(t));
      return matchesCategory && matchesSearch;
    });
  }, [query, activeCategory]);

  const filtered = filterDocs();
  const isFiltering = query.length > 0 || activeCategory !== "all";

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "/" && document.activeElement.tagName !== "INPUT") {
        e.preventDefault();
        document.getElementById("searchInput")?.focus();
      }
      if (e.key === "Escape") {
        setQuery("");
        document.getElementById("searchInput")?.blur();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Layout
      title="Notes & Resources"
      description="A curated collection of notes, insights, and references from engineering talks, research, and hands-on experience."
    >
      <header className={styles.hero}>
        <div className={styles.heroGlow} />
        <p className={styles.heroLabel}>Personal Knowledge Base</p>
        <h1 className={styles.heroTitle}>
          Notes & <em>Resources</em>
        </h1>
        <p className={styles.heroSubtitle}>
          A curated collection of notes, insights, and references from
          engineering talks, research, and hands-on experience.
        </p>
        <div className={styles.searchWrapper}>
          <div className={styles.searchInputGroup}>
            <svg
              className={styles.searchIcon}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              id="searchInput"
              className={styles.searchInput}
              type="text"
              placeholder="Search documents by title, description, or tag..."
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <p className={styles.searchHint}>
            Press <kbd>/</kbd> to search · <kbd>Esc</kbd> to clear
          </p>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.filterBar}>
          <span className={styles.filterLabel}>Filter</span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              className={`${styles.filterBtn} ${
                activeCategory === cat.key ? styles.filterBtnActive : ""
              }`}
              onClick={() => setActiveCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {isFiltering && (
          <p className={styles.resultsCount}>
            {filtered.length} document{filtered.length !== 1 ? "s" : ""} found
          </p>
        )}

        {filtered.length > 0 ? (
          <div className={styles.cardGrid}>
            {filtered.map((doc, i) => (
              <Card key={i} doc={doc} />
            ))}
            {!isFiltering && <ComingSoon />}
          </div>
        ) : (
          <NoResults />
        )}
      </div>
    </Layout>
  );
}
