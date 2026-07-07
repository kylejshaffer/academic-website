const AUTH_STORAGE_KEY = "academic-site-auth";
const AUTH_USERNAME = "scholar";
const AUTH_PASSWORD = "research2026";

function isAuthenticated() {
  return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

function setAuthenticated() {
  localStorage.setItem(AUTH_STORAGE_KEY, "true");
}

function clearAuthenticated() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

function getCurrentPageName() {
  return window.location.pathname.split("/").pop() || "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const currentPage = getCurrentPageName();
  const loginForm = document.getElementById("login-form");
  const loginMessage = document.getElementById("login-message");
  const logoutLink = document.getElementById("logout-link");

  if (logoutLink) {
    logoutLink.addEventListener("click", (event) => {
      event.preventDefault();
      clearAuthenticated();
      window.location.href = "login.html";
    });
  }

  if (currentPage === "login.html") {
    if (isAuthenticated()) {
      window.location.replace("index.html");
      return;
    }

    if (loginForm) {
      loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const enteredUsername = document.getElementById("username").value.trim();
        const enteredPassword = document.getElementById("password").value;

        if (enteredUsername === AUTH_USERNAME && enteredPassword === AUTH_PASSWORD) {
          setAuthenticated();
          window.location.href = "index.html";
        } else if (loginMessage) {
          loginMessage.textContent = "That username or password was incorrect.";
          loginMessage.className = "auth-message error";
        }
      });
    }

    return;
  }

  if (!isAuthenticated()) {
    window.location.replace("login.html");
  }
});
