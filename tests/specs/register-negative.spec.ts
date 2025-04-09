import { test, expect } from '@playwright/test';
import { RegisterPage, User } from '../pages/RegisterPage';

test.describe('Registration - Negative', () => {
  const timestamp = Date.now();
  const validUser: User = {
    gender: true,
    firstName: 'Test',
    lastName: 'User',
    email: `testuser_${timestamp}@example.com`,
    password: 'Test1234!',
  };

  test('Error message when first name is missing', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    let userWithMissingFirstName = validUser;
    userWithMissingFirstName.firstName = undefined;
    await registerPage.fillRegistrationForm(userWithMissingFirstName);
    await registerPage.submitForm();
    await registerPage.expectValidationError();
    const error = page.locator('[data-valmsg-for="FirstName"]');
    await expect(error).toHaveText('First name is required.');
  });

  test('Error message when last name is missing', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    let userWithMissingLastName = validUser;
    userWithMissingLastName.lastName = undefined;
    await registerPage.fillRegistrationForm(userWithMissingLastName);
    await registerPage.submitForm();
    await registerPage.expectValidationError();
    const error = page.locator('[data-valmsg-for="LastName"]');
    await expect(error).toHaveText('Last name is required.');
  });

  test('Error message when email is missing', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    let userWithMissingEmail = validUser;
    userWithMissingEmail.email = undefined;
    await registerPage.fillRegistrationForm(userWithMissingEmail);
    await registerPage.submitForm();
    await registerPage.expectValidationError();
    const error = page.locator('[data-valmsg-for="Email"]');
    await expect(error).toHaveText('Email is required.');
  });

  test('Error message when password is missing', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    let userWithMissingPassword = validUser;
    userWithMissingPassword.password = undefined;
    await registerPage.fillRegistrationForm(userWithMissingPassword);
    await registerPage.submitForm();
    await registerPage.expectValidationError();
    const error = page.locator('[data-valmsg-for="Password"]');
    await expect(error).toHaveText('Password is required.');
  });

  test('Error message when confirm password is missing', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    let userWithMissingConfirmPassword = validUser;
    userWithMissingConfirmPassword.confirmPassword = undefined;
    await registerPage.fillRegistrationForm(userWithMissingConfirmPassword);
    await registerPage.submitForm();
    await registerPage.expectValidationError();
    const error = page.locator('[data-valmsg-for="ConfirmPassword"]');
    await expect(error).toHaveText('Password is required.');
  });

  test('Error message for invalid email format', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    let userWithInvalidEmail = validUser;
    userWithInvalidEmail.email = 'invalid-email';
    await registerPage.fillRegistrationForm(userWithInvalidEmail);
    await registerPage.submitForm();
    const error = page.locator('[data-valmsg-for="Email"]');
    await expect(error).toHaveText('Wrong email');
  });

  test('Error message when password is too short', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    let userWithShortPassword = validUser;
    userWithShortPassword.password = '123';
    userWithShortPassword.confirmPassword = '123';
    await registerPage.fillRegistrationForm(userWithShortPassword);
    await registerPage.submitForm();
    const error = page.locator('[data-valmsg-for="Password"]');
    await expect(error).toHaveText('The password should have at least 6 characters.');
  });

  test('Error message when passwords do not match', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    let userWithDifferentConfirmPassword = validUser;
    userWithDifferentConfirmPassword.confirmPassword = 'Different123!';
    await registerPage.fillRegistrationForm(userWithDifferentConfirmPassword);
    await registerPage.submitForm();
    const error = page.locator('[data-valmsg-for="ConfirmPassword"]');
    await expect(error).toHaveText('The password and confirmation password do not match.');
  });
});
