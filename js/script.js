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
