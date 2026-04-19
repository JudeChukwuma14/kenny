// exchange rate base data (simulated live)
const ratesDB = {
  USD: { NGN: 1520, KES: 129.5, GHS: 15.2 },
  EUR: { NGN: 1650, KES: 140.2, GHS: 16.5 },
  GBP: { NGN: 1920, KES: 162.8, GHS: 19.2 },
};

const sendInput = document.getElementById("sendAmount");
const receiveField = document.getElementById("receiveAmount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const liveRateSpan = document.getElementById("liveRateDisplay");

function updateConversion() {
  let amount = parseFloat(sendInput.value);
  if (isNaN(amount) || amount <= 0) amount = 0;
  const from = fromCurrency.value;
  const toCode = toCurrency.value;
  let rate = 1;
  if (ratesDB[from] && ratesDB[from][toCode]) {
    rate = ratesDB[from][toCode];
  } else {
    rate = 1520;
  }
  const converted = amount * rate;
  receiveField.value =
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(converted) +
    " " +
    toCode;
  liveRateSpan.innerHTML = `<i class="fas fa-chart-simple"></i> 1 ${from} = ${rate.toFixed(2)} ${toCode} • No hidden fees`;
}

sendInput.addEventListener("input", updateConversion);
fromCurrency.addEventListener("change", updateConversion);
toCurrency.addEventListener("change", updateConversion);

// initial load
updateConversion();

// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileNav = document.getElementById("mobileNav");

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("show");
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && href !== "") {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});

// Add animation on scroll (simple fade-in)
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document
  .querySelectorAll(".feature-card, .step-item, .trust-banner")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
