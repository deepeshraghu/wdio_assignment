import AppScreen from './AppScreen';

class CatalogScreen extends AppScreen {
  constructor() {
    super('~products screen'); // Uses the selector for the catalog screen
  }

  /**
   * Waits for the catalog screen to be displayed.
   *
   * This method will pause execution until the catalog screen is visible,
   * ensuring it is ready for interaction.
   *
   * @async
   * @returns {Promise<void>} - A promise that resolves when the catalog screen is displayed.
   */
  async waitForIsShown() {
    await $(this.selector).waitForDisplayed();
  }
}

export default new CatalogScreen();
