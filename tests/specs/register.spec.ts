import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { saveTestData } from '../utils/saveTestData';

test.describe('Registration', () => {
  test('Successful registration of a new user', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const email = `testuser_${Date.now()}@example.com`;
    const password = 'Test1234!';

    await registerPage.goto();
    await registerPage.register({
      gender: true,
      firstName: 'Test',
      lastName: 'User',
      email: email,
      password: password,
      confirmPassword: password,
    });
    await registerPage.expectSuccessMessage();

    await expect(page.locator('.result')).toHaveText('Your registration completed');
    await expect(page.locator('a.account').first()).toHaveText(email);
    saveTestData('test-user.json', { email, password });
  });
});
