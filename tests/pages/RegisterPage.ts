import { Page, Locator } from '@playwright/test';

export type User = {
  gender?: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export class RegisterPage {
  readonly page: Page;
  readonly genderMale: Locator;
  readonly genderFemale: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly resultMessage: Locator;
  readonly errorMessages: Locator;

  constructor(page: Page) {
    this.page = page;
    this.genderMale = page.locator('#gender-male');
    this.genderFemale = page.locator('#gender-female');
    this.firstNameInput = page.locator('#FirstName');
    this.lastNameInput = page.locator('#LastName');
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.confirmPasswordInput = page.locator('#ConfirmPassword');
    this.registerButton = page.locator('#register-button');
    this.resultMessage = page.locator('.result');
    this.errorMessages = page.locator('.field-validation-error');
  }

  async goto() {
    await this.page.goto('https://demowebshop.tricentis.com/register');
  }

  async fillRegistrationForm({
    gender,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  }: User) {
    if (gender !== undefined) {
      gender ? await this.genderMale.check() : await this.genderFemale.check();
    }
    if (firstName) {
      await this.firstNameInput.fill(firstName);
    }
    if (lastName) {
      await this.lastNameInput.fill(lastName);
    }
    if (email) {
      await this.emailInput.fill(email);
    }
    if (password) {
      await this.passwordInput.fill(password);
    }
    if (confirmPassword) {
      await this.confirmPasswordInput.fill(confirmPassword);
    }
  }

  async submitForm() {
    await this.registerButton.click();
  }

  async register({
    gender,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  }: User) {
    await this.fillRegistrationForm({
      gender,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });
    await this.submitForm();
  }

  async expectSuccessMessage() {
    await this.resultMessage.waitFor({ state: 'visible' });
  }

  async expectValidationError() {
    await this.errorMessages.first().waitFor({ state: 'visible' });
  }
}
