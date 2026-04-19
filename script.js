
  const ratesDB = {
    GBP: { NGN: 2350, KES: 200.5, GHS: 23.5, INR: 105.8 },
    EUR: { NGN: 1650, KES: 140.2, GHS: 16.5, INR: 89.5 },
    USD: { NGN: 1520, KES: 129.5, GHS: 15.2, INR: 83.2 },
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
    let rate = ratesDB[from]?.[toCode] || 2350;
    const converted = amount * rate;
    receiveField.value = new Intl.NumberFormat("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(converted) + " " + toCode;
    liveRateSpan.innerHTML = `<i class="fas fa-chart-simple"></i> 1 ${from} = ${rate.toFixed(2)} ${toCode} • No hidden fees • FCA regulated`;
  }

  sendInput.addEventListener("input", updateConversion);
  fromCurrency.addEventListener("change", updateConversion);
  toCurrency.addEventListener("change", updateConversion);
  updateConversion();

  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileNav = document.getElementById("mobileNav");
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => mobileNav.classList.toggle("show"));
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.feature-card, .step-item, .trust-banner').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });