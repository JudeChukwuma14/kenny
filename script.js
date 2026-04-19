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
  const toCode = toCurrency.value; // NGN, KES, GHS
  let rate = 1;
  if (ratesDB[from] && ratesDB[from][toCode]) {
    rate = ratesDB[from][toCode];
  } else {
    // fallback
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
  // update live rate display text
  liveRateSpan.innerHTML = `<i class="fas fa-chart-simple"></i> 1 ${from} = ${rate.toFixed(2)} ${toCode} • No hidden fees`;
}

sendInput.addEventListener("input", updateConversion);
fromCurrency.addEventListener("change", updateConversion);
toCurrency.addEventListener("change", updateConversion);

// initial load
updateConversion();

// optional compare widget dynamic if needed (static is fine)
const compareDiv = document.getElementById("compareDisplay");
if (compareDiv) {
  // already perfect
}

// Make sure rate card refresh on currency change
const style = document.createElement("style");
style.innerHTML = `input[readonly] { cursor: default; }`;
document.head.appendChild(style);
