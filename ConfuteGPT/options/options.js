// settings.js
document.addEventListener("DOMContentLoaded", function () {
  const apiKeyInput = document.getElementById("apiKeyInput");
  const saveButton = document.getElementById("saveButton");

  saveButton.addEventListener("click", function () {
    const openaiApiKey = apiKeyInput.value.trim();
    if (openaiApiKey) {
      chrome.storage.sync.set({ openaiApiKey: openaiApiKey }, function () {
        alert("API key saved successfully!");
      });
    }
  });
});
