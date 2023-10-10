const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const dynamicCategories = require("eleventy-plugin-dynamic-categories");
const _favicon = (icon) => `/assets/favicon/${icon}.png`;
const pluginMermaid = require("@kevingimbel/eleventy-plugin-mermaid");
const pluginInlineLinkFavicon = require("eleventy-plugin-inline-link-favicon");
const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
  // Add Passthrough Copy
  eleventyConfig.addPassthroughCopy("./src/css/");
  eleventyConfig.addPassthroughCopy("./src/assets/");
  eleventyConfig.addPassthroughCopy("./src/js/");
  // Markdown
  let options = {
    html: true,
    breaks: true,
    linkify: true,
    quotes: "“”‘’",
  };

  // Add Filters
  // filter for page favicon
  eleventyConfig.addFilter("faviconify", function (pageUrl) {
    // First, check if it's the root page
    if (pageUrl === "/") return _favicon("homepage");
    // Next, check if it's a subpage
    if (pageUrl.startsWith("/project/")) return _favicon("project");
    if (pageUrl.startsWith("/blog/")) return _favicon("blog");
    if (pageUrl.startsWith("/photos/")) return _favicon("photo");
    if (pageUrl.startsWith("/info/")) return _favicon("info");
    if (pageUrl.startsWith("/archive/")) return _favicon("archive");
    return _favicon("homepage"); // Default icon
  });

  // filter for date
  eleventyConfig.addFilter("postDate", (dataObj) => {
    return DateTime.fromJSDate(dataObj).toLocaleString(DateTime.DATE_MED);
  });

  eleventyConfig.addFilter("extractYear", function (dateString) {
    const date = new Date(dateString);
    return date.getFullYear().toString();
  });

  // Inline link favicon
  eleventyConfig.addPlugin(pluginInlineLinkFavicon);

  // SyntaxHighlight
  eleventyConfig.addPlugin(syntaxHighlight);

  // eleventy-plugin-dynamic-categories
  eleventyConfig.addPlugin(dynamicCategories, {
    categoryVar: "categories",
    itemsCollection: "post",
    categoryCollection: "categories",
    perPageCount: 5,
  });

  eleventyConfig.addPlugin(dynamicCategories, {
    categoryVar: "categories",
    itemsCollection: "project",
    categoryCollection: "projectcategories",
    perPageCount: 5,
  });

  // Markdown
  eleventyConfig.setLibrary("md", markdownIt(options));

  // Mermaid
  eleventyConfig.addPlugin(pluginMermaid, {
    // load mermaid
    mermaid_js_src:
      "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs",
    html_tag: "div",
    extra_classes: "graph",
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
