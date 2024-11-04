class CatalogScreen {
  async waitForIsShown() {
      await $('~products screen').waitForDisplayed();
  }
}

export default new CatalogScreen();
