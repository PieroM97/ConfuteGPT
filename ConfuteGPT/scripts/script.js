// script.js
document.addEventListener("DOMContentLoaded", function () {
  const startAnalysisButton = document.getElementById("startAnalysisButton");
  const validationContent = document.getElementById("validationContent");

  startAnalysisButton.addEventListener("click", function () {
    // Show the loading message
    validationContent.textContent = "Processing...";

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      if (activeTab) {
        const websiteUrl = activeTab.url;

        getWebsiteText(websiteUrl)
          .then((text) => {
            if (text) {
              // Analyze the article using ChatGPT
              analyzePage(validationContent, text);
            } else {
              validationContent.textContent = "Failed to fetch text from the website. Please try again.";
            }
          })
          .catch((error) => {
            validationContent.textContent = "Error occurred while fetching website content.";
          });
      }
    });
  });
});
