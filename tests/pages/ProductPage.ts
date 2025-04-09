import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly notificationBar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.notificationBar = page.locator('#bar-notification');
  }

  async gotoCategory(categoryPath: string) {
    await this.page.goto(`https://demowebshop.tricentis.com/${categoryPath}`);
    await this.page.waitForSelector('.product-item');
  }

  async openProduct(productName: string) {
    const productLink = this.page.locator(`.product-title a:has-text("${productName}")`);
    await productLink.waitFor({ state: 'visible' });
    await productLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async addToCart() {
    const addToCartButton = this.page.locator('input[value="Add to cart"]').first();
    await addToCartButton.waitFor({ state: 'visible' });
    await addToCartButton.click();
    await this.notificationBar.waitFor({ state: 'visible' });
  }

  async getNotificationText(): Promise<string> {
    return await this.notificationBar.innerText();
  }
}
