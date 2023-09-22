const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const dynamicCategories = require("eleventy-plugin-dynamic-categories");
const _favicon = (icon) => `/assets/image/favicon/${icon}.svg`;

module.exports = function (eleventyConfig) {
  // Add Passthrough Copy
  eleventyConfig.addPassthroughCopy("./src/css/");
  eleventyConfig.addPassthroughCopy("./src/assets/");
  eleventyConfig.addPassthroughCopy("./src/js/");

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

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
