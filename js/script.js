class BarcodeScanner {
  constructor() {
    this.input = document.querySelector(".scanner__input");
    this.resultBarCode = document.querySelector(".result__barCode");
    this.initScanner();
  }

  initScanner() {
    this.input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.handleScan(this.input.value);
        this.input.value = "";
      }
    });
  }

  handleScan(barcode) {
    this.resultBarCode.textContent = `Відскановано: ${barcode}`;
    // Тут можна додати логіку перевірки ціни
  }
}
new BarcodeScanner();

const fullscreenBtn = document.getElementById("fullscreenBtn");

// Функція для повноекранного режиму
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      alert(`Помилка: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}

// Додаємо обробник на кнопку
fullscreenBtn.addEventListener("click", toggleFullscreen);