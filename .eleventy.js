const { DateTime } = require("luxon");

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

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
