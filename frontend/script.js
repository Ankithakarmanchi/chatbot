const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const uploadBtn = document.getElementById("upload-btn");
const imageInput = document.getElementById("image-input");

// Add message to chat
function addMessage(content, sender, isHTML = false) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");
  if (isHTML) {
    msgDiv.innerHTML = content; // render HTML (tables, flowcharts etc.)
  } else {
    msgDiv.innerText = content;
  }
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Simulated bot responses
function getBotResponse(message) {
  message = message.toLowerCase();

  if (message.includes("table")) {
    return `
      <table border="1" style="border-collapse:collapse; width:100%">
        <tr><th>Symptom</th><th>Possible Disease</th></tr>
        <tr><td>Skin Rash</td><td>Allergy / Infection</td></tr>
        <tr><td>Fever</td><td>Flu / Viral Infection</td></tr>
      </table>`;
  }
  if (message.includes("flowchart")) {
    return `
      <div>
        <b>Disease Prediction Flowchart:</b><br>
        Start → Symptom Check → Diagnosis → Recommendation
      </div>`;
  }
  return "Interesting! Tell me more...";
}

// Send text message
sendBtn.addEventListener("click", () => {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage(message, "user");
  userInput.value = "";

  setTimeout(() => {
    const response = getBotResponse(message);
    addMessage(response, "bot", true);
  }, 500);
});

// Support Enter key
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});

// Upload image
uploadBtn.addEventListener("click", () => {
  imageInput.click();
});

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      addMessage(`<img src="${reader.result}" width="200">`, "user", true);
      setTimeout(() => {
        addMessage("I received your photo 📷. (Future backend can analyze this image)", "bot");
      }, 600);
    };
    reader.readAsDataURL(file);
  }
});
