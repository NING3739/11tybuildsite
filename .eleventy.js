// Importing required modules
const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const Image = require("@11ty/eleventy-img");

const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const dynamicCategories = require("eleventy-plugin-dynamic-categories");
const pluginMermaid = require("@kevingimbel/eleventy-plugin-mermaid");
const pluginInlineLinkFavicon = require("eleventy-plugin-inline-link-favicon");

// Function to generate favicon path
const _favicon = (icon) => `/assets/favicon/${icon}.png`;

// Function to determine favicon based on page URL
function faviconify(pageUrl) {
    if (pageUrl === "/") return _favicon("homepage");
    if (pageUrl.startsWith("/project/")) return _favicon("project");
    if (pageUrl.startsWith("/blog/")) return _favicon("blog");
    if (pageUrl.startsWith("/photos/")) return _favicon("photo");
    if (pageUrl.startsWith("/info/")) return _favicon("info");
    if (pageUrl.startsWith("/archive/")) return _favicon("archive");
    return _favicon("homepage");  // Default icon
}

// Function to format post date
function postDate(dataObj) {
    return DateTime.fromJSDate(dataObj).toLocaleString(DateTime.DATE_MED);
}

// Function to extract year from a date string
function extractYear(dateString) {
    const date = new Date(dateString);
    return date.getFullYear().toString();
}

// Function to format date to YYYY-MM-DD format
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  // padStart ensures the month is two digits
    const day = String(date.getDate()).padStart(2, '0');  // padStart ensures the date is two digits
    return `${year}-${month}-${day}`;
}

// Function to generate image elements with different resolutions and formats
async function generateImage(src, alt, options) {
    if(!src) {
        throw new Error(`Missing \`src\` on image shortcode.`);
    }
    if(alt === undefined) {
        throw new Error(`Missing \`alt\` on image from: ${src}`);
    }

    let stats = await Image(src, {
        widths: [300, 600, 900, 1200, 1800, 2400],
        formats: ["webp", "jpeg", "avif", "png"],
        urlPath: "/assets/image/",
        outputDir: "./src/assets/image/",
        sharpOptions: {
            quality: 80,  // Set the quality to 80 (range is 1 to 100)
        },
        sharpJpegOptions: {
            mozjpeg: true,
            quality: 80,
            progressive: true
        },
        sharpPngOptions: {
            quality: 80,
            compressionLevel: 9
        },
        sharpWebpOptions: {
            quality: 80
        },
        sharpAvifOptions: {
            quality: 80
        },
    });

    let lowestSrc = stats.jpeg[0];
    let highResSrc = stats.jpeg[stats.jpeg.length - 1];

    return `<picture>
        ${Object.values(stats).map(imageFormat => {
            return `  <source type="image/${imageFormat[0].format}" srcset="${imageFormat.map(entry => `${entry.url} ${entry.width}w`).join(", ")}" sizes="(min-width: 1024px) 1024px, (min-width: 768px) 768px, 100vw">`;
        }).join("\n")}
            <img
            src="${lowestSrc.url}"
            width="${lowestSrc.width}"
            height="${lowestSrc.height}"
            alt="${alt}"
            loading="lazy"
            decoding="async">
    </picture>`;
}

module.exports = function (eleventyConfig) {
    // Passthrough Copy configurations for static assets
    eleventyConfig.addPassthroughCopy("./src/css/");
    eleventyConfig.addPassthroughCopy("./src/assets/");
    eleventyConfig.addPassthroughCopy("./src/js/");

    // Adding custom filters
    eleventyConfig.addFilter("faviconify", faviconify);
    eleventyConfig.addFilter("postDate", postDate);
    eleventyConfig.addFilter("extractYear", extractYear);
    eleventyConfig.addFilter("formatDate", formatDate);

    // Adding photos collection
    eleventyConfig.addCollection("photos", function (collection) {
        // Load and return the data from photos.json
        const photosData = require("./src/photos/photos.json");
        return photosData;
    });

    // Adding image shortcode
    eleventyConfig.addNunjucksAsyncShortcode("image", generateImage);

    // Adding plugins
    eleventyConfig.addPlugin(pluginInlineLinkFavicon);
    eleventyConfig.addPlugin(syntaxHighlight);

    // Adding dynamic categories plugin configurations
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

    // Setting Markdown library with custom options
    let options = {
        html: true,
        breaks: true,
        linkify: true,
        quotes: "“”‘’",
    };
    eleventyConfig.setLibrary("md", markdownIt(options));

    // Adding Mermaid plugin with custom configurations
    eleventyConfig.addPlugin(pluginMermaid, {
        mermaid_js_src: "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs",
        html_tag: "div",
        extra_classes: "graph",
    });

    // Returning configuration object
    return {
        dir: {
            input: "src",
            output: "public",
        },
    };
};
