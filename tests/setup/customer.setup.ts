import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { env } from '@config/env';

setup('Аутентификация с ролью покупателя', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(env.customer.email, env.customer.password);

  await expect(page).toHaveURL(/account/);
  await page.context().storageState({ path: env.storage.customer });
  console.log(loginPage)
});