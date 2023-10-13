// Create a script element to load the Google Tag Manager library
var gtagScript = document.createElement('script');
gtagScript.async = true;
gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-84G74EF9KS';

// Append the script element to the head of the document
document.head.appendChild(gtagScript);

// Define the gtag function and initialize Google Analytics once the library has loaded
gtagScript.onload = function() {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'G-84G74EF9KS');
}
