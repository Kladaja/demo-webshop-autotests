import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartTable: Locator;
  readonly productNames: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartTable = page.locator('.cart');
    this.productNames = page.locator('.cart .product-name');
  }

  async goto() {
    await this.page.goto('https://demowebshop.tricentis.com/cart');
    await this.cartTable.waitFor({ state: 'visible' });
  }

  async getProductNamesInCart(): Promise<string[]> {
    const rawNames = await this.productNames.allTextContents();
    return rawNames.map(name => name.trim().toLowerCase());
  }

  async hasProduct(productName: string): Promise<boolean> {
    const normalizedName = productName.trim().toLowerCase();
    const names = await this.getProductNamesInCart();
    return names.some(name => name.includes(normalizedName));
  }
}
