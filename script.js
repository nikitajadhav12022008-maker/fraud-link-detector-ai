// Default dark mode
document.body.classList.add("dark");

function analyze() {
  let text = document.getElementById("inputText").value.toLowerCase();
  let result = document.getElementById("result");
  let scoreText = document.getElementById("score");
  let reasonsList = document.getElementById("reasons");
  let loader = document.getElementById("loader");
  let bar = document.getElementById("bar");

  loader.classList.remove("hidden");
  result.innerText = "";
  scoreText.innerText = "";
  reasonsList.innerHTML = "";

  setTimeout(() => {
    loader.classList.add("hidden");

    let score = 0;
    let reasons = [];

    // 🚨 Suspicious words
    let dangerWords = [
      "urgent",
      "win",
      "free",
      "prize",
      "click now",
      "account blocked",
    ];

    dangerWords.forEach((word) => {
      if (text.includes(word)) {
        score += 20;
        reasons.push("⚠️ Contains: " + word);
      }
    });

    // 🔗 HTTP check
    if (text.includes("http://")) {
      score += 25;
      reasons.push("⚠️ Uses HTTP (not secure)");
    }

    // ❌ @ symbol trick
    if (text.includes("@")) {
      score += 30;
      reasons.push("❌ Contains @ (redirect trick)");
    }

    // 💀 Fake domains
    if (
      text.includes("g00gle") ||
      text.includes("paytm-secure") ||
      text.includes("amaz0n")
    ) {
      score += 40;
      reasons.push("❌ Fake brand detected");
    }

    // 📏 Long message
    if (text.length > 120) {
      score += 10;
      reasons.push("⚠️ Message too long");
    }

    // 🎯 Result logic
    let finalText = "";
    let color = "";

    if (score >= 70) {
      finalText = "❌ High Scam Risk";
      color = "red";
    } else if (score >= 40) {
      finalText = "⚠️ Suspicious";
      color = "orange";
    } else {
      finalText = "✅ Looks Safe";
      color = "green";
    }

    // 🎯 Show score
    scoreText.innerText = "Risk Score: " + score + "%";
    scoreText.style.color = color;

    result.innerText = finalText;
    result.style.color = color;

    // 🔥 Update meter
    bar.style.width = score + "%";

    if (score >= 70) {
      bar.style.background = "red";
    } else if (score >= 40) {
      bar.style.background = "orange";
    } else {
      bar.style.background = "green";
    }

    // 📋 Show reasons
    reasons.forEach((r) => {
      let li = document.createElement("li");
      li.innerText = r;
      reasonsList.appendChild(li);
    });
  }, 1200);
}

// 🌙 Toggle mode
function toggleMode() {
  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
  } else {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
  }
}
