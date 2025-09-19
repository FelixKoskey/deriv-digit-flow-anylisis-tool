<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Deriv Digit Flow Analysis Tool</title>
  <meta name="description" content="Deriv Digit Flow Analysis Tool - Expert trading analysis for digits flow.">
  <meta name="keywords" content="Deriv, Digit Analysis, Trading, Flow Analysis, Tool, Expert Trader">
  <link rel="stylesheet" href="style.css" />
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <!-- Loader -->
  <div id="loader" class="loader-overlay">
    <div class="loader-circle">
      <div class="loader-track"></div>
      <div class="loader-arc"></div>
    </div>
  </div>
  <!-- Login Form -->
  <div class="login-overlay" id="loginOverlay">
    <form id="loginForm" class="login-form">
      <h2>Login</h2>
      <input type="password" id="passwordInput" placeholder="Enter password" required />
      <button type="submit">Access Tool</button>
      <div id="loginError" class="error"></div>
    </form>
  </div>
  <div class="container" id="mainContainer" style="display:none;">
    <div class="header">
      <h1><span class="highlight">Deriv Digit Flow</span> Analysis Tool</h1>
      <button class="logout-btn" id="logoutBtn">Logout</button>
      <button class="connector-btn">Deriv Connector</button>
    </div>
    <!-- Main App Content -->
    <div id="appContent">
      <p>Welcome to Deriv Digit Flow Analysis Tool. (Main app features go here.)</p>
      <!-- You can add charts, search fields, and more here -->
    </div>
  </div>
  <script src="app.js"></script>
</body>
</html>
