// popup.js
function getOpenAIKey() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("openaiApiKey", function (data) {
      const openaiApiKey = data.openaiApiKey;
      resolve(openaiApiKey);
    });
  });
}


function analyzePage(element, text) {
  getOpenAIKey()
    .then((openaiApiKey) => {
      if (!openaiApiKey) {
        element.textContent = "OpenAI API key is missing. Please set your API key in the settings.";
        return;
      }

      fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are confuteGPT, the trustworthy information analyst. Every time the user will send you something, it will be an article, taken from the web or from journals. Your role is to explain the article to the user, pointing out if there are fake news and misleading information. In case you find them, you will have to confute them. Finally you give a score to the article, from 0 ( completely unreliable ) to 10 ( facts ). You must answer using the language used by the user in the article.`,
            },
            {
              role: "user",
              content: text,
            },
          ],
          temperature: 1,
          stream: false,
          top_p: 1,
        }),
      })
        .then((response) => {
          // Check if the response is successful (status code 200)
          if (!response.ok) {
            throw new Error(`Error occurred: ${response.status} ${response.statusText}`);
          }
          return response.json(); // Return response as JSON
        })
        .then((jsonData) => {
          // Extract the assistant's reply from the JSON
          if (jsonData.choices && jsonData.choices.length > 0) {
            const assistantReply = jsonData.choices[0].message.content;
            element.innerHTML = `<em>${assistantReply}</em>`;
          } else {
            throw new Error("Invalid response data: 'choices' array is empty or not found.");
          }
        })
        .catch((error) => {
          console.error("Error occurred:", error);
          element.textContent = "Error occurred while processing the request.";
        });
    })
    .catch((error) => {
      console.error("Error occurred:", error);
      element.textContent = "Error occurred while processing the request.";
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const startAnalysisButton = document.getElementById("startAnalysisButton");
  const settingsButton = document.getElementById("settingsButton");
  const validationContent = document.getElementById("validationContent");

  startAnalysisButton.addEventListener("click", function () {
  });

  settingsButton.addEventListener("click", function () {
    chrome.runtime.openOptionsPage();
  });
});