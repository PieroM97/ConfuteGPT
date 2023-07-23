// crawler.js
function getWebsiteText(url) {
  return fetch(url)
    .then((response) => response.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      let text = "";
      const paragraphs = doc.getElementsByTagName("p");
      for (const paragraph of paragraphs) {
        text += paragraph.textContent + "\n";
      }

      return text.trim();
    })
    .catch((error) => {
      console.error("Error occurred:", error);
      return null;
    });
}
