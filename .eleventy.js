const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const dynamicCategories = require("eleventy-plugin-dynamic-categories");

module.exports = function (eleventyConfig) {
  // Add Passthrough Copy
  eleventyConfig.addPassthroughCopy("./src/css/");
  eleventyConfig.addPassthroughCopy("./src/assets/");
  eleventyConfig.addPassthroughCopy("./src/js/");

  // Add Global Data
  eleventyConfig.addGlobalData("pageFavicons", {
    "/": "/assets/image/favicon/homepage.svg",
    "/project/": "/assets/image/favicon/project.svg",
    "/photos/": "/assets/image/favicon/photo.svg",
    "/blog/": "/assets/image/favicon/blog.svg",
    "/info/": "/assets/image/favicon/info.svg",
    "/archive/": "/assets/image/favicon/archive.svg",
  });

  // Add Filters
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
    categoryVar: "categories", // Name of your category variable from your frontmatter (default: categories)
    itemsCollection: "post", // Name of your collection to use for the items (default: posts)
    categoryCollection: "categories", // Name of the new collection to use for the categories (default: value in categoryVar)
    // categoryCollection MUST be unique currently
    perPageCount: 5, // Number of items to display per page of categoriesByPage (default: 5)
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
