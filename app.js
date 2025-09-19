use strict;

// ====== PASSWORD LOGIN LOGIC ======
const APP_PASSWORD = "Felix254@com"; // <--- CHANGE THIS TO YOUR PASSWORD

const loginOverlay = document.getElementById("loginOverlay");
const loginForm = document.getElementById("loginForm");
const passwordInput = document.getElementById("passwordInput");
const loginError = document.getElementById("loginError");
const mainContainer = document.getElementById("mainContainer");
const logoutBtn = document.getElementById("logoutBtn");

function showLogin() {
  loginOverlay.style.display = "flex";
  mainContainer.style.display = "none";
  passwordInput.value = "";
  loginError.textContent = "";
}
function showApp() {
  loginOverlay.style.display = "none";
  mainContainer.style.display = "block";
}

loginForm.addEventListener("submit", function(e) {
  e.preventDefault();
  if (passwordInput.value === APP_PASSWORD) {
    showApp();
    sessionStorage.setItem("loggedIn", "true");
  } else {
    loginError.textContent = "Incorrect password.";
  }
});
logoutBtn.addEventListener("click", function() {
  sessionStorage.removeItem("loggedIn");
  showLogin();
});
if (sessionStorage.getItem("loggedIn") === "true") {
  showApp();
} else {
  showLogin();
}

// ====== MAIN APP LOGIC ======
const wsUrl = "wss://ws.derivws.com/websockets/v3?app_id=1089";
let ws = null;
let lastDigits = [];
const MAX_TICKS = 100;
let symbol = "1HZ10V";
const digitStats = document.getElementById("digitStats");
const symbolSelect = document.getElementById("symbolSelect");
const connectBtn = document.getElementById("connectBtn");

symbolSelect.addEventListener("change", function() {
  symbol = symbolSelect.value;
  if (ws) ws.close();
  startWebSocket();
});
connectBtn.addEventListener("click", function() {
  if (ws) ws.close();
  startWebSocket();
});

function startWebSocket() {
  ws = new WebSocket(wsUrl);
  ws.onopen = function() {
    ws.send(JSON.stringify({
      ticks_history: symbol,
      end: "latest",
      count: MAX_TICKS,
      style: "ticks"
    }));
    ws.send(JSON.stringify({ ticks: symbol }));
  };
  ws.onmessage = function(msg) {
    let data = JSON.parse(msg.data);
    if (data.history && data.history.prices) {
      lastDigits = data.history.prices.map(p => String(p).slice(-1));
      updateChart();
      updateStats();
    }
    if (data.tick && data.tick.quote) {
      let digit = String(data.tick.quote).slice(-1);
      lastDigits.push(digit);
      if (lastDigits.length > MAX_TICKS) lastDigits.shift();
      updateChart();
      updateStats();
    }
  };
  ws.onerror = function() { digitStats.textContent = "Connection error!"; };
  ws.onclose = function() { /* auto-reconnect optional */ };
}

function updateStats() {
  let counts = Array(10).fill(0);
  lastDigits.forEach(d => counts[parseInt(d)]++);
  let total = lastDigits.length;
  let html = "";
  for (let i = 0; i < 10; i++) {
    html += `Digit <b>${i}</b>: ${counts[i]} (${((counts[i]/total)*100).toFixed(1)}%)<br>`;
  }
  digitStats.innerHTML = html;
}

let chart = null;
function updateChart() {
  let counts = Array(10).fill(0);
  lastDigits.forEach(d => counts[parseInt(d)]++);
  if (!chart) {
    const ctx = document.getElementById('digitChart').getContext('2d');
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [...Array(10).keys()].map(String),
        datasets: [{
          label: 'Digit Frequency (last ' + MAX_TICKS + ' ticks)',
          data: counts,
          backgroundColor: '#e94560'
        }]
      },
      options: {
        scales: {
          x: { title: { display: true, text: 'Digit' } },
          y: { title: { display: true, text: 'Count' }, beginAtZero: true }
        }
      }
    });
  } else {
    chart.data.datasets[0].data = counts;
    chart.update();
  }
}

// Start WebSocket by default
startWebSocket();

// Loader control (optional)
function showLoader() { document.getElementById("loader").style.display = "flex"; }
function hideLoader() { document.getElementById("loader").style.display = "none"; }
window.addEventListener("load", () => { setTimeout(hideLoader, 800); });
