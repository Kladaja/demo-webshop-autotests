import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { beforeEach } from 'node:test';

test.describe('Login - Negative', () => {
  test('Error message for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('invalid@example.com', 'WrongPassword123');
    await loginPage.expectErrorMessage();
    const messageText = await loginPage.errorMessage.innerText();
    expect(messageText).toContain('Login was unsuccessful');
  });

  test('Error message when fields are empty', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('', '');
    await loginPage.expectErrorMessage();
    const messageText = await loginPage.errorMessage.innerText();
    expect(messageText).toContain('Login was unsuccessful');
  });
});
