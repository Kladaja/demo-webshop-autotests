import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly resultMessage: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.loginButton = page.locator('input[value="Log in"]');
    this.resultMessage = page.locator('.result');
    this.errorMessage = page.locator('.message-error');
  }

  async goto() {
    await this.page.goto('https://demowebshop.tricentis.com/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getLoggedInUserEmail(): Promise<string> {
    return await this.page.locator('a.account').first().innerText();
  }

  async expectErrorMessage() {
    await this.errorMessage.waitFor();
  }
}
