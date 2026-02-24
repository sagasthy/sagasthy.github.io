// @ts-check
import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Knowledge Base",
  tagline:
    "Notes, insights, and resources from engineering talks, research, and hands-on experience.",
  favicon: "img/favicon.ico",

  url: "https://sagasthy.github.io",
  baseUrl: "/",

  organizationName: "sagasthy",
  projectName: "sagasthy.github.io",
  deploymentBranch: "gh-pages",
  trailingSlash: false,

  onBrokenLinks: "log",

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "log",
    },
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          routeBasePath: "docs",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "dark",
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: "Knowledge Base",
        logo: {
          alt: "Knowledge Base Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "docsSidebar",
            position: "left",
            label: "Docs",
          },
          {
            href: "https://github.com/sagasthy/sagasthy.github.io",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Content",
            items: [
              {
                label: "Docs",
                to: "/docs/intro",
              },
              {
                label: "AMPECO Webinar",
                href: "pathname:///ampeco-webinar.html",
              },
              {
                label: "Build Failure Agent",
                href: "pathname:///build-failure-agent-presentation.html",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/sagasthy/sagasthy.github.io",
              },
            ],
          },
        ],
        copyright: `Built with ☕ and Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ["bash", "json", "yaml", "python", "java"],
      },
    }),
};

export default config;
