import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Navigation', () => {
  test('User can navigate to Notebooks category', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.navigateToCategory('Computers', 'Notebooks');

    await expect(page).toHaveURL(/.*notebooks/);
    await expect(page.locator('h1')).toHaveText('Notebooks');
  });

  test('User can navigate to Cameras category', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.navigateToCategory('Electronics', 'Camera, photo');

    await expect(page).toHaveURL(/.*camera-photo/);
    await expect(page.locator('h1')).toHaveText('Camera, photo');
  });

  test('User can navigate to Shopping cart', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.goToShoppingCart();

    await expect(page).toHaveURL(/.*\/cart/);
    await expect(page.locator('h1')).toHaveText('Shopping cart');
  });

  test('User can navigate to Login page', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.goToLoginPage();

    await expect(page).toHaveURL(/.*\/login/);
    await expect(page.locator('h1')).toHaveText('Welcome, Please Sign In!');
  });
});
