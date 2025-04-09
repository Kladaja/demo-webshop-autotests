import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { loadTestData } from '../utils/loadTestData';

test.describe('Add to Cart', () => {
  let user: { email: string; password: string };
  let products: Record<string, { name: string; searchName: string, category: string }>;

  test.beforeEach(async ({ page }) => {
    user = loadTestData('test-user.json');
    products = loadTestData('test-products.json');
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(user.email, user.password);
  });

  test('Add a single product to the cart', async ({ page }) => {
    const { name: productName, category } = products.laptop;
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await productPage.gotoCategory(category);
    await productPage.openProduct(productName);
    await productPage.addToCart();

    const notification = await productPage.getNotificationText();
    expect(notification).toContain('The product has been added to your shopping cart');

    await cartPage.goto();
    expect(await cartPage.hasProduct(productName)).toBeTruthy();
  });

  test('Add multiple products to cart', async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    for (const { searchName, category } of Object.values(products)) {
      await productPage.gotoCategory(category);
      await productPage.openProduct(searchName);
      await productPage.addToCart();

      const notification = await productPage.getNotificationText();
      expect(notification).toContain('The product has been added to your shopping cart');
    }

    await cartPage.goto();
    for (const { name } of Object.values(products)) {
      expect(await cartPage.hasProduct(name)).toBeTruthy();
    }
  });
});
