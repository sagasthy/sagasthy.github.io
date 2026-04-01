/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    "intro",
    {
      type: "category",
      label: "Webinars",
      items: ["webinars/ampeco-ai-native-engineering"],
      collapsed: false,
    },
    {
      type: "category",
      label: "Reference",
      items: [
        "reference/build-failure-agent",
        "reference/github-copilot-guide",
        "reference/az-400-cheasheet"
      ],
      collapsed: false,
    },
  ],
};

export default sidebars;
