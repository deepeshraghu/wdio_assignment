// screen-objects/CatalogScreen.js
class CatalogScreen {
  async waitForIsShown() {
    await $('~products screen').waitForDisplayed();
  }
}

export default new CatalogScreen();
