import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { loadTestData } from '../utils/loadTestData';

test.describe('Login', () => {
  test('Successful login with existing user', async ({ page }) => {
    const user = loadTestData('test-user.json');
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(user.email, user.password);
    const actualEmail = await loginPage.getLoggedInUserEmail();
    expect(actualEmail).toBe(user.email);
  });
});
