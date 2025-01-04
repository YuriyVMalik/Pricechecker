class BarcodeScanner {
  constructor() {
    this.input = document.querySelector(".scanner__input");
    this.resultBarCode = document.querySelector(".result__barCode");

    this.resultGoods = document.querySelector(".result__goods");
    this.resultPrice = document.querySelector(".result__price");

    this.initScanner();
    this.setFunctions();
    this.setSettings();
  }

  initScanner() {
    this.input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.handleScan(this.input.value);
        this.input.value = "";
      }
    });
  }

  setFunctions() {
    const setting__resetSettings_button = document.querySelector(
      ".setting__resetSettings"
    );
    const setting__defaultSetting_button = document.querySelector(
      ".setting__defaultSetting"
    );
    const setting__save_button = document.querySelector(".setting__save");
    const commandPanel__fullscreen_button = document.querySelector(
      ".commandPanel__fullscreen"
    );
    const commandPanel__setting_button = document.querySelector(
      ".commandPanel__setting"
    );

    setting__resetSettings_button.addEventListener("click", this.resetSettings);
    setting__defaultSetting_button.addEventListener(
      "click",
      this.defaultSetting
    );


    setting__save_button.addEventListener("click", this.saveSettings.bind(this));
    commandPanel__fullscreen_button.addEventListener(
      "click",
      this.toggleFullscreen
    );
    commandPanel__setting_button.addEventListener(
      "click",
      this.showScreenSetting
    );
  }

  resetSettings() {
    const shop = document.querySelector(".setting__shop");
    const serverAddress = document.querySelector(".setting__serverAddress");
    const authorizationToken = document.querySelector(
      ".setting__authorizationToken"
    );

    shop.value = "";
    serverAddress.value = "";
    authorizationToken.value = "";

    const settingData = {
      shop: shop.value,
      serverAddress: serverAddress.value,
      authorizationToken: authorizationToken.value,
    };

    let JSONSetting = JSON.stringify(settingData);
    localStorage.setItem("PriceCheckerSetting", JSONSetting);
  }

  defaultSetting() {
    const shop = document.querySelector(".setting__shop");
    const serverAddress = document.querySelector(".setting__serverAddress");
    const authorizationToken = document.querySelector(
      ".setting__authorizationToken"
    );

    shop.value = "РТ0000070";
    serverAddress.value = "192.168.0.102";
    authorizationToken.value = "svvgmp9980885516";

    const settingData = {
      shop: shop.value,
      serverAddress: serverAddress.value,
      authorizationToken: authorizationToken.value,
    };

    let JSONSetting = JSON.stringify(settingData);
    localStorage.setItem("PriceCheckerSetting", JSONSetting);
  }

  saveSettings() {
    const shop = document.querySelector(".setting__shop");
    const serverAddress = document.querySelector(".setting__serverAddress");
    const authorizationToken = document.querySelector(".setting__authorizationToken");

    const settingData = {
      shop: shop.value,
      serverAddress: serverAddress.value,
      authorizationToken: authorizationToken.value,
    };

    this.showScreenScanner();

    let JSONSetting = JSON.stringify(settingData);
    localStorage.setItem("PriceCheckerSetting", JSONSetting);

    
  }

  setSettings() {
    const PriceCheckerSettingJSON = localStorage.getItem("PriceCheckerSetting");
    if (PriceCheckerSettingJSON !== null) {
      const PriceCheckerSetting = JSON.parse(PriceCheckerSettingJSON);

      const shop = document.querySelector(".setting__shop");
      const serverAddress = document.querySelector(".setting__serverAddress");
      const authorizationToken = document.querySelector(
        ".setting__authorizationToken"
      );

      shop.value = PriceCheckerSetting.shop;
      serverAddress.value = PriceCheckerSetting.serverAddress;
      authorizationToken.value = PriceCheckerSetting.authorizationToken;

      this.shop = PriceCheckerSetting.shop;
      this.serverAddress = PriceCheckerSetting.serverAddress;
      this.authorizationToken = PriceCheckerSetting.authorizationToken;

      this.showScreenScanner();
    } else {
      this.showScreenSetting();
    }
  }

  showScreenScanner() {
    const setting = document.querySelector(".setting");
    const scanner = document.querySelector(".scanner");

    scanner.classList.toggle("hidden", false);
    setting.classList.toggle("hidden", true);
  }

  showScreenSetting() {
    const setting = document.querySelector(".setting");
    const scanner = document.querySelector(".scanner");


    scanner.classList.toggle("hidden", true);
    setting.classList.toggle("hidden", false);
  }

  async handleScan(barcode) {
    this.resultBarCode.textContent = `Відскановано: ${barcode}`;
    const productInfo = await this.getProductInfo(barcode);
    
    if (productInfo) {
       this.resultGoods.textContent = productInfo.name;
       this.resultPrice.textContent = productInfo.price + " грн.";
       if(productInfo.error !== ""){
          this.resultBarCode.textContent = productInfo.error;
       }
    }

  }

  async getProductInfo(barcode) {
    const url = `http://${this.serverAddress}/Ret/hs/PricecheckerAPI/infoGoods`;

    const data = {
      barCode: barcode,
      shop: this.shop,
      authorizationToken: this.authorizationToken,
    };
    let JSONSetting = JSON.stringify(data);

    //2200000000125
    try {
      const response = await fetch(url, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authorizationToken}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Помилка отримання даних");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Помилка:", error);
      return null;
    }
  }

  toggleFullscreen() {
    console.log("asdsad");

    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        alert(`Помилка: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }
}

new BarcodeScanner();
