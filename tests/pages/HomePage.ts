import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly topMenu: Locator;
  readonly shoppingCartLink: Locator;
  readonly loginLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.topMenu = page.locator('ul.top-menu');
    this.shoppingCartLink = page.getByRole('link', { name: 'Shopping cart', exact: true });
    this.loginLink = page.locator('a[href="/login"]');
  }

  async goto() {
    await this.page.goto('https://demowebshop.tricentis.com/');
  }

  async navigateToCategory(parentCategory: string, subCategory: string) {
    const parentLocator = this.page.locator(`ul.top-menu > li:has-text("${parentCategory}")`);
    await parentLocator.hover();
    await parentLocator.locator(`text=${subCategory}`).click();
  }

  async goToShoppingCart() {
    await this.shoppingCartLink.click();
  }

  async goToLoginPage() {
    await this.loginLink.click();
  }
}
